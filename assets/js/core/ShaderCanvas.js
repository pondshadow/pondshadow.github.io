import * as THREE from "three";

async function fetchShader(url, signal) {
  const response = await fetch(url, {
    signal,
    cache: "no-cache"
  });

  if (!response.ok) {
    throw new Error(
      `无法加载着色器：${url} (${response.status} ${response.statusText})`
    );
  }

  return response.text();
}

export class ShaderCanvas {
  static async create({
    container,
    vertexUrl,
    fragmentUrl,
    uniforms = {},
    maxPixelRatio = 2,
    pauseWhenOffscreen = true
  }) {
    if (!(container instanceof HTMLElement)) {
      throw new TypeError("ShaderCanvas 需要一个有效的容器元素。");
    }

    const abortController = new AbortController();

    try {
      const [vertexShader, fragmentShader] = await Promise.all([
        fetchShader(vertexUrl, abortController.signal),
        fetchShader(fragmentUrl, abortController.signal)
      ]);

      return new ShaderCanvas({
        container,
        vertexShader,
        fragmentShader,
        uniforms,
        maxPixelRatio,
        pauseWhenOffscreen
      });
    } catch (error) {
      abortController.abort();
      throw error;
    }
  }

  constructor({
    container,
    vertexShader,
    fragmentShader,
    uniforms = {},
    maxPixelRatio = 2,
    pauseWhenOffscreen = true
  }) {
    if (!(container instanceof HTMLElement)) {
      throw new TypeError("ShaderCanvas 需要一个有效的容器元素。");
    }

    this.container = container;
    this.maxPixelRatio = maxPixelRatio;
    this.isDisposed = false;
    this.isVisible = true;
    this.isManuallyPaused = false;
    this.contextLost = false;
    this.animationFrame = null;
    this.startTime = performance.now();
    this.mouseHasMoved = false;
    this.drawingBufferSize = new THREE.Vector2();

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    this.renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: false,
      powerPreference: "high-performance"
    });

    this.renderer.setClearColor(0x000000, 1);
    this.renderer.debug.checkShaderErrors = true;
    this.renderer.debug.onShaderError = (
      gl,
      program,
      vertexShaderObject,
      fragmentShaderObject
    ) => {
      const programLog = gl.getProgramInfoLog(program) || "";
      const vertexLog = gl.getShaderInfoLog(vertexShaderObject) || "";
      const fragmentLog = gl.getShaderInfoLog(fragmentShaderObject) || "";
      const message = [programLog, vertexLog, fragmentLog]
        .filter(Boolean)
        .join("\n") || "着色器编译失败。";
      const error = new Error(message);

      console.error("Shader compilation error", error);
      this.container.dispatchEvent(
        new CustomEvent("shadererror", { detail: { error } })
      );
    };
    this.renderer.domElement.setAttribute("aria-hidden", "true");
    this.renderer.domElement.classList.add("shader-renderer", "is-entering");

    this.uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(1, 1) },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      ...uniforms
    };

    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      glslVersion: THREE.GLSL3,
      depthTest: false,
      depthWrite: false
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
    this.container.appendChild(this.renderer.domElement);

    this.handleResize = this.resize.bind(this);
    this.handlePointerMove = this.onPointerMove.bind(this);
    this.handleVisibilityChange = this.updateRunningState.bind(this);
    this.handleContextLost = this.onContextLost.bind(this);
    this.handleContextRestored = this.onContextRestored.bind(this);
    this.renderFrame = this.renderFrame.bind(this);

    this.resizeObserver = new ResizeObserver(this.handleResize);
    this.resizeObserver.observe(this.container);

    window.addEventListener("resize", this.handleResize, { passive: true });
    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );

    this.renderer.domElement.addEventListener(
      "pointermove",
      this.handlePointerMove,
      { passive: true }
    );
    this.renderer.domElement.addEventListener(
      "webglcontextlost",
      this.handleContextLost
    );
    this.renderer.domElement.addEventListener(
      "webglcontextrestored",
      this.handleContextRestored
    );

    if (pauseWhenOffscreen) {
      this.intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          this.isVisible = entry.isIntersecting;
          this.updateRunningState();
        },
        { threshold: 0.01 }
      );
      this.intersectionObserver.observe(this.container);
    }

    this.resize();
    this.updateRunningState();
  }

  resize() {
    if (this.isDisposed) return;

    const width = Math.max(1, this.container.clientWidth);
    const height = Math.max(1, this.container.clientHeight);
    const pixelRatio = Math.min(
      window.devicePixelRatio || 1,
      this.maxPixelRatio
    );

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height, false);
    this.renderer.getDrawingBufferSize(this.drawingBufferSize);
    this.uniforms.u_resolution.value.copy(this.drawingBufferSize);

    if (!this.mouseHasMoved) {
      this.uniforms.u_mouse.value.set(
        this.drawingBufferSize.x * 0.5,
        this.drawingBufferSize.y * 0.5
      );
    }

    this.camera.updateProjectionMatrix();
  }

  onPointerMove(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width;
    const normalizedY = (event.clientY - rect.top) / rect.height;

    this.uniforms.u_mouse.value.set(
      normalizedX * this.drawingBufferSize.x,
      (1 - normalizedY) * this.drawingBufferSize.y
    );
    this.mouseHasMoved = true;
  }

  renderFrame(timestamp) {
    if (!this.shouldRender()) {
      this.animationFrame = null;
      return;
    }

    this.uniforms.u_time.value = (timestamp - this.startTime) * 0.001;
    this.renderer.render(this.scene, this.camera);
    this.animationFrame = requestAnimationFrame(this.renderFrame);
  }

  shouldRender() {
    return (
      !this.isDisposed &&
      !this.isManuallyPaused &&
      !this.contextLost &&
      this.isVisible &&
      !document.hidden
    );
  }

  updateRunningState() {
    const shouldRun = this.shouldRender();

    if (shouldRun && this.animationFrame === null) {
      this.animationFrame = requestAnimationFrame(this.renderFrame);
    }

    if (!shouldRun && this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  setPaused(paused) {
    this.isManuallyPaused = Boolean(paused);
    this.updateRunningState();
  }

  setUniform(name, value) {
    const uniform = this.uniforms[name];

    if (!uniform) {
      throw new Error(`Uniform "${name}" 未注册。`);
    }

    if (
      uniform.value &&
      typeof uniform.value.copy === "function" &&
      value &&
      typeof value === "object"
    ) {
      uniform.value.copy(value);
    } else {
      uniform.value = value;
    }
  }

  onContextLost(event) {
    event.preventDefault();
    this.contextLost = true;
    this.updateRunningState();
  }

  onContextRestored() {
    this.contextLost = false;
    this.resize();
    this.updateRunningState();
  }

  dispose() {
    if (this.isDisposed) return;

    this.isDisposed = true;
    this.updateRunningState();
    this.resizeObserver.disconnect();
    this.intersectionObserver?.disconnect();

    window.removeEventListener("resize", this.handleResize);
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
    this.renderer.domElement.removeEventListener(
      "pointermove",
      this.handlePointerMove
    );
    this.renderer.domElement.removeEventListener(
      "webglcontextlost",
      this.handleContextLost
    );
    this.renderer.domElement.removeEventListener(
      "webglcontextrestored",
      this.handleContextRestored
    );

    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
