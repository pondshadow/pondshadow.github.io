import { ShaderCanvas } from "./core/ShaderCanvas.js";
import { loadShaderRegistry } from "./core/ShaderRegistry.js";

const container = document.querySelector("[data-entry-canvas]");
const status = document.querySelector("[data-entry-status]");
const slideDuration = 8500;

let registry = [];
let currentSlide = null;
let currentIndex = 0;
let loadSequence = 0;
let slideTimer = null;

function showError(message) {
  if (!status) return;

  status.hidden = false;
  status.textContent = message;
}

async function showSlide(index) {
  const entry = registry[index];
  if (!entry || !container) return;

  const sequence = ++loadSequence;

  try {
    const nextSlide = await ShaderCanvas.create({
      container,
      vertexUrl: entry.vertexUrl,
      fragmentUrl: entry.fragmentUrl,
      maxPixelRatio: 1.5,
      pauseWhenOffscreen: false
    });

    if (sequence !== loadSequence) {
      nextSlide.dispose();
      return;
    }

    const previousSlide = currentSlide;
    currentSlide = nextSlide;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nextSlide.renderer.domElement.classList.remove("is-entering");
      });
    });

    if (previousSlide) {
      previousSlide.renderer.domElement.classList.add("is-leaving");
      window.setTimeout(() => previousSlide.dispose(), 1200);
    }
  } catch (error) {
    console.error(error);
    showError("背景着色器加载失败。请使用本地静态服务器预览。");
  }
}

async function playSlideshow() {
  await showSlide(currentIndex);
  currentIndex = (currentIndex + 1) % registry.length;
  slideTimer = window.setTimeout(playSlideshow, slideDuration);
}

async function bootstrap() {
  if (!container) return;

  try {
    registry = await loadShaderRegistry();
    await playSlideshow();
  } catch (error) {
    console.error(error);
    showError("背景着色器加载失败。请使用本地静态服务器预览。");
  }
}

window.addEventListener(
  "pagehide",
  () => {
    loadSequence += 1;
    window.clearTimeout(slideTimer);
    currentSlide?.dispose();
  },
  { once: true }
);

bootstrap();
