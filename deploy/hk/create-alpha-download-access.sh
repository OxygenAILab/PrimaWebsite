#!/usr/bin/env bash
# Create the Prima website OAuth client and seven password-only AlphaTest users.
# Run on the HK host. The generated credential file is root-only and is never
# written into the repository.
set -euo pipefail

if [[ -z "${TEMP_ADMIN_PASSWORD:-}" || -z "${TEMP_ADMIN_PASSWORD_HASH:-}" || -z "${TEMP_ADMIN_TOTP_SECRET:-}" ]]; then
  echo "TEMP_ADMIN_PASSWORD, TEMP_ADMIN_PASSWORD_HASH and TEMP_ADMIN_TOTP_SECRET are required" >&2
  exit 1
fi

CONTAINER="${POSTGRES_CONTAINER:-oxygenaccount-postgres-1}"
DB_USER="${POSTGRES_USER:-oxygen}"
DB_NAME="${POSTGRES_DB:-oxygenaccount}"
ADMIN="${ADMIN_API:-http://127.0.0.1:8082}"
CLIENT_NAME="${CLIENT_NAME:-Prima Website Alpha Downloads}"
PROD_REDIRECT="${PROD_REDIRECT:-https://prima.oxygenai.top/download/api/auth/callback}"
LOCAL_REDIRECT="${LOCAL_REDIRECT:-http://127.0.0.1:8091/download/api/auth/callback}"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
RESULT_FILE="${RESULT_FILE:-/root/prima-alpha-download-accounts-${STAMP}.jsonl}"
TEMP_EMAIL="deploy-alpha-${STAMP,,}@oxygenai.top"
TEMP_JAR="$(mktemp)"

umask 077
touch "$RESULT_FILE"

psql_exec() {
  docker exec -i "$CONTAINER" psql -v ON_ERROR_STOP=1 -U "$DB_USER" -d "$DB_NAME" "$@"
}

cleanup() {
  psql_exec -v email="$TEMP_EMAIL" >/dev/null 2>&1 <<'SQL' || true
BEGIN;
DELETE FROM admin_sessions
 WHERE admin_id IN (SELECT id FROM admin_users WHERE email = :'email');
DELETE FROM admin_users WHERE email = :'email';
COMMIT;
SQL
  rm -f "$TEMP_JAR"
}
trap cleanup EXIT

psql_exec -v client_name="$CLIENT_NAME" \
  -v prod_redirect="$PROD_REDIRECT" \
  -v local_redirect="$LOCAL_REDIRECT" <<'SQL'
BEGIN;
WITH existing AS (
  SELECT id FROM oauth_clients
   WHERE redirect_uris @> ARRAY[:'prod_redirect']::text[]
   LIMIT 1
), inserted AS (
  INSERT INTO oauth_clients (
    id, name, client_id, secret_hash, redirect_uris, allowed_scopes, status,
    created_by, client_type, token_endpoint_auth_method
  )
  SELECT
    gen_random_uuid(), :'client_name', 'oa_' || replace(gen_random_uuid()::text, '-', ''),
    NULL, ARRAY[:'prod_redirect', :'local_redirect'],
    ARRAY['openid', 'profile', 'email'], 'active', NULL, 'public', 'none'
  WHERE NOT EXISTS (SELECT 1 FROM existing)
  RETURNING id, client_id
)
INSERT INTO audit_logs (
  id, actor_type, actor_id, action, target_type, target_id, result,
  user_agent, meta
)
SELECT
  gen_random_uuid(), 'service', NULL, 'app.create', 'oauth_client', id, 'ok',
  'prima-download-gate-installer',
  jsonb_build_object(
    'client_id', client_id,
    'client_type', 'public',
    'redirect_uris', jsonb_build_array(:'prod_redirect', :'local_redirect'),
    'allowed_scopes', jsonb_build_array('openid', 'profile', 'email')
  )
FROM inserted;
COMMIT;
SQL

CLIENT_ID="$(
  psql_exec -v prod_redirect="$PROD_REDIRECT" -At <<'SQL'
SELECT client_id FROM oauth_clients
 WHERE redirect_uris @> ARRAY[:'prod_redirect']::text[]
 ORDER BY created_at
 LIMIT 1;
SQL
)"
if [[ -z "$CLIENT_ID" ]]; then
  echo "failed to create or find the Prima download OAuth client" >&2
  exit 1
fi

# A temporary superadmin is required because the user-create API is privileged.
# The caller supplies a one-off password hash and TOTP secret; the row is
# deleted by the EXIT trap before this script returns.
psql_exec \
  -v email="$TEMP_EMAIL" \
  -v password_hash="$TEMP_ADMIN_PASSWORD_HASH" \
  -v totp_secret="$TEMP_ADMIN_TOTP_SECRET" <<'SQL'
INSERT INTO admin_users (
  id, email, password_hash, role, totp_secret, created_at
)
SELECT
  gen_random_uuid(),
  :'email',
  :'password_hash',
  'superadmin',
  :'totp_secret',
  now()
FROM (SELECT 1) seed
WHERE NOT EXISTS (SELECT 1 FROM admin_users WHERE email = :'email');
SQL

CODE="$(
  node -e '
const c=require("crypto");const B="ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const s=process.argv[1];let bits=0,value=0,out=[];
for(const ch of s){value=(value<<5)|B.indexOf(ch);bits+=5;if(bits>=8){out.push((value>>>(bits-8))&255);bits-=8;}}
const key=Buffer.from(out),counter=Buffer.alloc(8);
counter.writeBigUInt64BE(BigInt(Math.floor(Date.now()/30000)));
const h=c.createHmac("sha1",key).update(counter).digest(),offset=h[19]&15;
const binary=((h[offset]&127)<<24)|(h[offset+1]<<16)|(h[offset+2]<<8)|h[offset+3];
console.log(String(binary%1000000).padStart(6,"0"));' "$TEMP_ADMIN_TOTP_SECRET"
)"

LOGIN_BODY="$(
  node -e 'console.log(JSON.stringify({email:process.argv[1],password:process.env.TEMP_ADMIN_PASSWORD,code:process.argv[2]}))' \
    "$TEMP_EMAIL" "$CODE"
)"
LOGIN_STATUS="$(
  curl -sS -o /dev/null -w '%{http_code}' -c "$TEMP_JAR" \
    -X POST "$ADMIN/admin/v1/auth/login" \
    -H 'content-type: application/json' \
    -H 'X-OxygenAccount-API-Version: 2' \
    --data "$LOGIN_BODY"
)"
if [[ "$LOGIN_STATUS" != "200" ]] || ! grep -q oa_admin "$TEMP_JAR"; then
  echo "temporary superadmin sign-in failed with HTTP $LOGIN_STATUS" >&2
  exit 1
fi

for index in $(seq 1 7); do
  email="AlphaTest${index}@oxygenai.top"
  normalized="${email,,}"
  existing="$(
    psql_exec -v normalized="$normalized" -At <<'SQL'
SELECT user_id FROM identities
 WHERE kind = 'email' AND normalized = :'normalized'
 LIMIT 1;
SQL
  )"
  if [[ -n "$existing" ]]; then
    psql_exec -v user_id="$existing" <<'SQL'
UPDATE users
   SET flags = coalesce(flags, '{}'::jsonb) || '{"alpha_test": true}'::jsonb,
       updated_at = now()
 WHERE id = :'user_id'::uuid;
SQL
    continue
  fi

  password="$(openssl rand -base64 24 | tr -d '/+=\n' | cut -c1-24)"
  body="$(
    node -e 'console.log(JSON.stringify({email:process.argv[1],password:process.argv[2],region:"cn"}))' \
      "$email" "$password"
  )"
  response="$(
    curl -sS -b "$TEMP_JAR" \
      -X POST "$ADMIN/admin/v1/users" \
      -H 'content-type: application/json' \
      -H 'X-OxygenAccount-API-Version: 2' \
      --data "$body"
  )"
  user_id="$(
    printf '%s' "$response" |
      node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const j=JSON.parse(s);if(!j.user?.id)process.exit(1);process.stdout.write(j.user.id)})'
  )"

  psql_exec -v user_id="$user_id" -v display_name="Alpha Test ${index}" <<'SQL'
UPDATE users
   SET flags = coalesce(flags, '{}'::jsonb) || '{"alpha_test": true}'::jsonb,
       updated_at = now()
 WHERE id = :'user_id'::uuid;

INSERT INTO user_profiles (user_id, display_name, created_at, updated_at)
VALUES (:'user_id'::uuid, :'display_name', now(), now())
ON CONFLICT (user_id) DO UPDATE
SET display_name = EXCLUDED.display_name, updated_at = now();
SQL

  RESPONSE="$response" EMAIL="$email" PASSWORD="$password" \
    node -e '
const j=JSON.parse(process.env.RESPONSE);
process.stdout.write(JSON.stringify({
  email:process.env.EMAIL,
  password:process.env.PASSWORD,
  user_id:j.user.id,
  totp_secret:j.totp_secret,
  recovery_codes:j.recovery_codes
})+"\n");' >>"$RESULT_FILE"
done

echo "CLIENT_ID=$CLIENT_ID"
echo "RESULT_FILE=$RESULT_FILE"
wc -l "$RESULT_FILE"
