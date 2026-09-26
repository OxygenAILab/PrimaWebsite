import { useI18n } from "../i18n";
import type { Localized } from "../data/content";

type BetaCtaProps = {
  id: string;
  title: Localized;
  copy: Localized;
};

/* 子页共用的收尾面板：五处同构，只有文案不同；按钮统一走同一个词典键 */
export default function BetaCta({ id, title, copy }: BetaCtaProps) {
  const { pick, t } = useI18n();

  return (
    <section className="container about-section" aria-labelledby={id}>
      <div className="contact-panel">
        <div>
          <h2 id={id}>{pick(title)}</h2>
          <p>{pick(copy)}</p>
        </div>
        <a className="button primary" href="../beta/">{t("cta.joinBeta")}</a>
      </div>
    </section>
  );
}
