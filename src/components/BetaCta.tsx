import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

type BetaCtaProps = {
  id: string;
  title: Localized;
  copy: Localized;
  action: Localized;
};

/* 子页共用的收尾面板：五处同构，只有文案不同 */
export default function BetaCta({ id, title, copy, action }: BetaCtaProps) {
  const { pick } = useI18n();

  return (
    <section className="container about-section" aria-labelledby={id}>
      <div className="contact-panel">
        <div>
          <h2 id={id}>{pick(title)}</h2>
          <p>{pick(copy)}</p>
        </div>
        <a className="button primary" href="../beta/">{pick(action)}</a>
      </div>
    </section>
  );
}
