/* 页面底光。三条规则：
   1. 不用矩形光带、不用角落大色球 —— 那会在页面上切出硬边界；
   2. 光的层次来自品牌自己的「基元点阵」，不是通用 aurora；
   3. 动效只碰 opacity / transform，软边一律靠渐变自身衰减。 */
export default function LightField() {
  return (
    <div className="lightfield" aria-hidden="true">
      <div className="light-canopy" />
      <div className="light-grain" />
      <div className="light-sweep" />
    </div>
  );
}
