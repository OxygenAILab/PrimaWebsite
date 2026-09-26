/* 页面底光：一束斜射光 + 两团呼吸光球。
   软边由 radial-gradient 自身衰减产生，不用 filter: blur（大面积模糊在 Safari 上很贵）。
   动画只碰 transform / opacity，滚动视差用 @supports 分级，不支持就静止。 */
export default function LightField() {
  return (
    <div className="lightfield" aria-hidden="true">
      <div className="light-beam" />
      <div className="light-orb light-orb-a" />
      <div className="light-orb light-orb-b" />
    </div>
  );
}
