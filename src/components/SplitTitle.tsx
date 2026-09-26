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
