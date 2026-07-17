# 池边影の着色器

一个无需构建工具的 Three.js / GLSL ES 3.00 三维着色器画廊，适合直接部署到 GitHub Pages。每个作品都通过全屏平面运行 Fragment Shader，并在着色器内部完成光线步进、距离场、法线和光照计算。

## 本地预览

着色器通过 `fetch()` 独立加载，因此不能直接双击打开 `index.html`，需要运行一个本地 HTTP 服务：

```sh
python -m http.server 8000
```

然后访问 `http://localhost:8000/`。

## 新增一个 Shader

以添加名为 `orbit` 的作品为例：

1. 新建文件夹和 Fragment Shader：`shaders/orbit/fragment.frag`。
2. 复用 `shaders/common/fullscreen.vert`。
3. 在 `shaders/manifest.json` 末尾加入一项：

```json
{
  "id": "orbit",
  "index": "005",
  "title": "轨道结构",
  "subtitle": "三维实验",
  "description": "这里填写作品的中文简介。",
  "vertex": "./shaders/common/fullscreen.vert",
  "fragment": "./shaders/orbit/fragment.frag"
}
```

4. 在 `assets/css/style.css` 添加 `.shader-list__preview--orbit`，为右侧作品栏提供一个 CSS 缩略图。
5. 本地预览确认后，提交并推送即可上线。

不要在 `.vert` 或 `.frag` 文件中写 `#version 300 es`；`ShaderCanvas` 已启用 `THREE.GLSL3`，Three.js 会自动处理版本声明。

每个 Fragment Shader 可直接使用：

```glsl
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

out vec4 outColor;
```

- `u_time`：该 Shader 启动后的秒数。
- `u_resolution`：包含 DPR 的真实绘制像素尺寸。
- `u_mouse`：鼠标像素坐标，原点位于左下角。

如果需要自定义参数，可以在 `ShaderCanvas.create()` 中传入 `uniforms`，再用 `setUniform(name, value)` 实时更新。
