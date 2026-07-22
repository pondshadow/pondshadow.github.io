# STATE.md

## Current Phase
本轮开发完成，待用户验收

## Active Task
无

## Active Owner
无

## Current Branch
dev

## Starting Commit
ddc3229

## Current Project State
- 静态作品集站点，GitHub Pages 托管于 www.stillshadow.com
- `dev` 基于 `ddc3229`，本轮修改尚未提交
- 首页背景已居中，安卓窄屏作品缩略图点击后尺寸保持稳定
- 博客列表、文章阅读与 hash 历史导航可用

## Changes
- 首页 canvas 显示尺寸绑定视口并移除偏移变换
- 窄屏禁用侧栏的桌面 hover/focus 展开布局，避免点击后拉伸
- 修复博客卡片类名、路由、脚本语法和 `popstate` 历史处理
- 补充项目文档中的博客目录与验证入口

## Validation
- `node --check assets/js/blog.js`：通过
- `node --check assets/js/main.js`：通过
- `node --check assets/js/entry.js`：通过
- `blogs/manifest.json`、`shaders/manifest.json` JSON 解析：通过
- 桌面视口 1280×720：首页 renderer 中心与视口中心均为 (640, 360)
- 安卓窄屏视口 412×915：点击作品前后缩略图均为 40×30，列表项尺寸稳定
- 博客列表、文章加载、返回列表和浏览器前进/后退：通过，控制台无页面错误
- `git diff --check`：通过

## Risks
- 已用安卓尺寸视口验证，尚未在实体安卓设备上复测浏览器差异

## Next Actions
1. 用户在实体安卓设备上复测作品栏点击行为
2. 用户验收后按需提交并推送 `dev`

## Relevant Files
- `assets/css/style.css`
- `assets/js/blog.js`
- `index.html`
- `gallery.html`
- `blog.html`

## Last Handoff
2026-07-22：本轮修改与验证完成，Owner 已释放；修改仅存在于当前工作树，尚未提交。
