# Project Task State

## Current focus

在 `dev` 分支继续日常开发，保持项目规则与交接状态同步。

## Current project state

- 项目是由 GitHub Pages 托管的原生 HTML、CSS、ES modules、Three.js 与 GLSL 静态作品集。
- `index.html` 是入口页，`gallery.html` 是实时 Shader 展示页。
- 入口页通过 `assets/js/entry.js` 轮播 `shaders/manifest.json` 中的作品作为背景。
- 展示页通过 `assets/js/main.js`、`ShaderRegistry.js` 与 `ShaderCanvas.js` 加载和切换 5 个 Shader 作品。
- 当前分支为 `dev`，从已提交的 `e1bb03d` 创建；工作区干净。
- `main` 与 `origin/main` 仍指向 `e1bb03d`。

## Changes since previous handoff

- 核对了仓库结构、近期提交、清单文件和当前工作区。
- 更新根目录 `AGENTS.md`，补充 `gallery.html` 与 `assets/js/entry.js` 的目录职责，并同步入口页与展示页的本地验证地址。
- 新增本文件，记录跨会话继续开发所需的状态。
- 玻璃质感 UI、项目规则和交接文件已由提交 `e1bb03d` 收录。
- 创建并切换到 `dev` 分支。

## Completed

- 入口页、展示页、Shader 清单和 Shader 资源均存在且路径结构一致。
- 项目规则已与当前入口页/展示页结构同步。

## In progress

- `assets/css/style.css` 中的玻璃质感与响应式 UI 优化已提交；仍需在本地浏览器完成视觉复核。

## Next actions

1. 在具备 `.git/FETCH_HEAD` 写权限的环境中重新执行 `git fetch --prune`，确认远程状态。
2. 保持在 `dev` 分支；启动 `python -m http.server 8000`，检查入口页和展示页。
3. 在桌面和窄屏视口检查 Shader 加载、作品切换、hash、全屏、玻璃层级与移动端遮挡情况。
4. 执行 `git diff --check` 和 `git status --short`，审阅后再按用户要求提交或继续修改。

## Relevant files

- `AGENTS.md`
- `.codex/TASK.md`
- `index.html`
- `gallery.html`
- `assets/css/style.css`
- `assets/js/entry.js`
- `assets/js/main.js`
- `assets/js/core/ShaderRegistry.js`
- `assets/js/core/ShaderCanvas.js`
- `shaders/manifest.json`

## Technical decisions

- 保持原生静态站点结构，不引入包管理器、构建工具或新的运行时依赖。
- 入口页与展示页分离，入口页只负责 Shader 背景轮播和进入展示页。
- Shader 作品仍以 `shaders/manifest.json` 作为唯一清单入口。
- 日常开发使用 `dev` 分支；`main` 保持稳定状态。
- 不执行分支切换、合并、rebase、stash、reset 或回退文件来覆盖用户工作。

## Validation

- `git status --short --branch`：已执行；结果为 `dev`，工作区干净。
- `git fetch --prune`：未成功；`.git/FETCH_HEAD` 返回 Permission denied。
- `git log --oneline --decorate -10`：已执行。
- `shaders/manifest.json`：已读取并确认包含 5 个作品及对应 vertex/fragment 路径。
- `git diff --check`：已执行并通过。
- 桌面/窄屏手动视觉检查：本次规则同步未执行。

## Known issues

- 当前环境无法写入 `.git/FETCH_HEAD`，暂时不能可靠获取远程最新状态。
- `dev` 当前只有本地分支，尚未推送为 `origin/dev`。

## AGENTS update status

- 已更新根目录 `AGENTS.md`，仅补充已从仓库确认的目录职责和本地页面地址。
