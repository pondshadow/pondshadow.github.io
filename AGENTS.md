# AGENTS.md

## 项目概览

这是 `stillshadow.github.io` 的静态个人作品集：一个展示 WebGL / Three.js / GLSL 实时着色器作品的单页站点。它直接由 GitHub Pages 托管；`CNAME` 指向 `www.stillshadow.com`，`.nojekyll` 必须保留。

项目没有包管理器、构建步骤或自动化测试。不要为了小改动引入框架、打包器或依赖。

## 目录职责

- `index.html`：入口页结构、文案、可访问性语义、Three.js import map。
- `gallery.html`：实时着色器展示页结构、作品档案、作品选择器与全屏入口。
- `blog.html`：博客文章列表与文章阅读页结构。
- `assets/css/style.css`：所有页面样式与响应式规则。
- `assets/js/main.js`：作品选择、URL hash、全屏和页面交互。
- `assets/js/entry.js`：入口页 Shader 背景轮播与入口状态提示。
- `assets/js/blog.js`：博客清单加载、Markdown 渲染与 URL hash 路由。
- `assets/js/core/ShaderRegistry.js`：读取并校验 `shaders/manifest.json`。
- `assets/js/core/ShaderCanvas.js`：WebGL renderer 生命周期、uniform、尺寸与上下文恢复。
- `shaders/manifest.json`：作品列表及元数据，是新增作品的入口。
- `shaders/common/fullscreen.vert`：共享全屏顶点着色器。
- `shaders/<作品 id>/fragment.frag`：各作品的 GLSL 片元着色器。
- `blogs/manifest.json` 与 `blogs/*.md`：博客文章索引与 Markdown 正文。
- `assets/icons/`：站点图标等静态资源。

## 本地开发与验证

着色器清单和 GLSL 文件通过 `fetch()` 加载，因此不要直接双击打开 `index.html`；请在仓库根目录运行本地静态服务器，例如：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000/`；展示页为 `http://localhost:8000/gallery.html`，博客页为 `http://localhost:8000/blog.html`。若系统没有 Python，可使用任意不改写文件的静态服务器。

每次涉及视觉或交互的修改，至少在桌面和窄屏视口手动检查：

1. 入口页能显示 Shader 背景轮播，进入展示页后能显示首个作品，浏览器控制台没有错误。
2. 作品列表、URL hash 前进/后退、键盘操作和全屏按钮正常。
3. 切换每个作品，确认 WebGL/GLSL 没有编译错误、画面不会明显掉帧。
4. 博客列表、文章打开、返回列表和浏览器前进/后退正常。
5. 检查 `git diff --check` 和 `git status --short`。

## 修改约定

- 保持原生 ES modules、HTML、CSS 和 GLSL 的现有风格；优先小而聚焦的改动。
- 所有文本文件必须是 UTF-8。Windows 终端显示乱码时，不要据此重写中文内容；先确认编辑器和文件编码。
- 继续使用相对 URL 和现有 CDN import map，避免破坏 GitHub Pages 的项目根路径部署。
- 修改 `manifest.json` 时，确保它是有效 JSON；每项均需有唯一的 `id`，并包含 `index`、`title`、`subtitle`、`description`、`principle`、`unrealApplication`、`vertex` 与 `fragment` 字段。路径必须指向实际文件。
- 新增作品时：新增 `shaders/<id>/fragment.frag`，在清单加入条目，并在 CSS 中为 `shader-list__preview--<id>` 提供选择器，保证列表预览有对应样式。
- `ShaderCanvas` 的默认 uniform 为 `u_time`、`u_resolution`、`u_mouse`；新增 shader 应兼容这些 uniform 或显式处理未使用情形。
- 维护无障碍行为：交互元素使用原生 `button`/`a`，同步更新 `aria-*` 状态，不用只依赖颜色传达选中状态。
- 性能优先：避免每帧创建对象、纹理或 renderer；切换 shader 时须释放旧 canvas 资源，避免渲染循环和事件监听泄漏。

## Git 与交付

- 开始前先查看 `git status --short`，不要覆盖或回退用户已有的未提交改动。
- 每个提交只包含一个完整意图；不要提交本地服务器产物、浏览器缓存或临时文件。
- 提交前审阅 diff，确认没有意外修改 `CNAME`、`.nojekyll` 或第三方 CDN 版本。
