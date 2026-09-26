import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

type SplitTitleProps = {
  id?: string;
  lead: Localized;
  stress: Localized;
  as?: "h1" | "h2";
};

/* 两拍标题：引导行退半步，重音行落在第二拍 */
export default function SplitTitle({ id, lead, stress, as: Tag = "h1" }: SplitTitleProps) {
  const { pick } = useI18n();

  return (
    <Tag id={id} className="split-title">
      <span className="lead-in">{pick(lead)}</span>
      <span className="stress">{pick(stress)}</span>
    </Tag>
  );
}

/* 中文可以任意字间断行，整句标题会被拦腰截断。
   按逗号切成语义块，块内禁止换行，换行只发生在停顿处；
   西文本就按词断行，交给 text-wrap 处理。 */
export function PhraseTitle({ id, title }: { id?: string; title: Localized }) {
  const { locale, pick } = useI18n();
  const text = pick(title);
  const clauses = locale === "zh" ? text.split("，") : [text];

  return (
    <h2 id={id}>
      {clauses.map((clause, i) => (
        <span key={i} className="phrase">
          {i < clauses.length - 1 ? `${clause}，` : clause}
        </span>
      ))}
    </h2>
  );
}
