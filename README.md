# Prima website

Prima 站的源码，React 19 + Vite 7 + TypeScript，GitHub Pages 自动部署。

## Commands

```bash
npm install
npm run dev        # 本地预览
npm run build      # tsc -b + vite build → dist/
npm run lint       # tsc --noEmit
npm run preview
```

## 页面结构

多入口静态站，13 个 `index.html` 共用 `src/main.tsx`：根目录是首页，其余在
`about/ beta/ download/ faq/ how-it-works/ model-list/ pricing/ privacy/ roadmap/ scenarios/ security/ terms/`。
其中 `faq/` 是不挂 React 的静态跳转页，指向 `about/`。入口靠 `<body data-page="...">` 选中组件，
新增页面要同时改三处：`vite.config.ts` 的 `rollupOptions.input`、`src/PageApp.tsx` 的 `PrimaPage`、
`src/main.tsx` 的 `pageMap`。

## 部署

`.github/workflows/deploy.yml` 推 `Website-Prima` 分支时构建 `dist/` 并发布到 prima.oxygenai.top。
`docs/` 是历史遗留的仓库内构建产物，当前工作流不使用它。

## 约定

- 文案双语：数据层用 `Localized`（`{ zh, en }`）对象，组件里用 `useI18n().pick({ zh, en })`；
  跨页固定文案进 `src/i18n.tsx` 的 dictionary。
- 定价档位数据在 `src/data/pricing.ts`，卡片与对照表共用；同族多档合并成一张卡，卡内切换。
- 模型清单数据在 `src/data/models.ts`，厂商为源、图标只声明一次；`public/vendors/` 放厂商图标。
- 页面主标题用 `SplitTitle`（`lead` 引导行 + `stress` 重音行）做两拍断行，不要在文案里塞 `<br />`。
- 颜色、圆角、字体一律走 `src/site.css` 顶部的 token，不要写死色值。

## 第三方资源

`public/vendors/` 下的厂商图标取自 [`@lobehub/icons`](https://github.com/lobehub/lobe-icons)（MIT License），
部分为彩色版 `-color.svg`；替换或新增图标时请一并保留该来源说明。
