import { ShaderCanvas } from "./core/ShaderCanvas.js";
import { loadShaderRegistry } from "./core/ShaderRegistry.js";

const showcase = document.querySelector(".showcase");
const container = document.querySelector("#shader-preview");
const stageMeta = document.querySelector(".shader-stage__meta");
const status = document.querySelector("[data-shader-status]");
const statusText = document.querySelector("[data-status-text]");
const retryButton = document.querySelector("[data-retry-shader]");
const shaderList = document.querySelector("[data-shader-list]");
const shaderCount = document.querySelector("[data-shader-count]");
const picker = document.querySelector("[data-shader-picker]");
const pickerPanel = document.querySelector("[data-picker-panel]");
const pickerToggle = document.querySelector("[data-picker-toggle]");
const fullscreenToggle = document.querySelector("[data-fullscreen-toggle]");
const activeIndex = document.querySelector("[data-active-index]");
const activeTitle = document.querySelector("[data-active-title]");
const activeDescription = document.querySelector("[data-active-description]");
const activePrinciple = document.querySelector("[data-active-principle]");
const activeUnrealApplication = document.querySelector(
  "[data-active-unreal-application]"
);

let registry = [];
let shaderChoices = [];
let currentShader = null;
let requestedShaderId = null;
let loadSequence = 0;

function setPickerOpen(open, { persist = true } = {}) {
  if (!picker || !pickerPanel || !pickerToggle) return;

  picker.dataset.open = String(open);
  pickerToggle.setAttribute("aria-expanded", String(open));
  pickerToggle.setAttribute(
    "aria-label",
    open ? "隐藏着色器作品栏" : "显示着色器作品栏"
  );
  pickerToggle.firstElementChild.textContent = open ? "×" : "≡";
  pickerPanel.inert = !open;

  if (persist) {
    localStorage.setItem("shader-gallery-floating-picker-open", String(open));
  }
}

function showStatus(message, { error = false, retry = false } = {}) {
  status.hidden = false;
  status.classList.toggle("is-error", error);
  statusText.textContent = message;
  retryButton.hidden = !retry;
}

function hideStatus() {
  status.hidden = true;
  retryButton.hidden = true;
}

function updateMetadata(entry) {
  activeIndex.textContent = entry.index;
  activeTitle.textContent = entry.title;
  activeDescription.textContent = entry.description;
  activePrinciple.textContent = entry.principle;
  activeUnrealApplication.textContent = entry.unrealApplication;

  stageMeta.animate(
    [
      { opacity: 0.25, transform: "translateY(12px)" },
      { opacity: 1, transform: "translateY(0)" }
    ],
    {
      duration: 520,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)"
    }
  );
}

function updateSelection(id) {
  shaderChoices.forEach((choice) => {
    const isSelected = choice.dataset.shaderId === id;
    choice.classList.toggle("is-active", isSelected);
    choice.setAttribute("aria-pressed", String(isSelected));
    if (isSelected) choice.scrollIntoView({ block: "nearest" });
  });
}

function createShaderChoice(entry, index) {
  const choice = document.createElement("button");
  choice.className = "shader-list__item";
  choice.type = "button";
  choice.dataset.shaderId = entry.id;
  choice.style.setProperty("--item-index", index);
  choice.setAttribute("aria-pressed", "false");

  const preview = document.createElement("span");
  preview.className = `shader-list__preview shader-list__preview--${entry.id}`;
  preview.setAttribute("aria-hidden", "true");

  const copy = document.createElement("span");
  copy.className = "shader-list__copy";

  const title = document.createElement("strong");
  title.textContent = entry.title;

  const subtitle = document.createElement("small");
  subtitle.textContent = entry.subtitle;

  const number = document.createElement("span");
  number.className = "shader-list__number";
  number.textContent = entry.index;

  copy.append(title, subtitle);
  choice.append(preview, copy, number);

  choice.addEventListener("click", () => {
    activateShader(entry.id, { historyMode: "push" });
  });

  choice.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex =
      (index + direction + shaderChoices.length) % shaderChoices.length;
    shaderChoices[nextIndex].focus();
  });

  return choice;
}

function renderShaderList(entries) {
  shaderList.replaceChildren();
  shaderChoices = entries.map(createShaderChoice);
  shaderList.append(...shaderChoices);
  shaderCount.textContent = `${String(entries.length).padStart(2, "0")} 个作品`;
}

function updateUrl(id, mode) {
  const url = new URL(window.location.href);
  url.hash = id;

  if (mode === "push") {
    history.pushState({ shaderId: id }, "", url);
  } else if (mode === "replace") {
    history.replaceState({ shaderId: id }, "", url);
  }
}

async function activateShader(id, { historyMode = null, force = false } = {}) {
  const entry = registry.find((shader) => shader.id === id) || registry[0];
  if (!entry) return;

  if (currentShader?.id === entry.id && !force) {
    updateSelection(entry.id);
    if (historyMode) updateUrl(entry.id, historyMode);
    return;
  }

  requestedShaderId = entry.id;
  const sequence = ++loadSequence;

  updateSelection(entry.id);
  updateMetadata(entry);
  showStatus(`正在载入「${entry.title}」…`);
  container.classList.add("is-loading");

  try {
    const nextCanvas = await ShaderCanvas.create({
      container,
      vertexUrl: entry.vertexUrl,
      fragmentUrl: entry.fragmentUrl,
      maxPixelRatio: 2,
      pauseWhenOffscreen: true
    });

    if (sequence !== loadSequence) {
      nextCanvas.dispose();
      return;
    }

    const previousShader = currentShader;
    currentShader = { id: entry.id, canvas: nextCanvas };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        nextCanvas.renderer.domElement.classList.remove("is-entering");
      });
    });

    if (previousShader) {
      previousShader.canvas.renderer.domElement.classList.add("is-leaving");
      window.setTimeout(() => previousShader.canvas.dispose(), 650);
    }

    container.classList.remove("is-loading");
    hideStatus();
    document.title = `${entry.title} — 池边影の小站`;

    if (historyMode) updateUrl(entry.id, historyMode);
  } catch (error) {
    if (sequence !== loadSequence) return;

    console.error(error);
    container.classList.remove("is-loading");
    showStatus(error.message || "着色器加载失败。", {
      error: true,
      retry: true
    });
  }
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else if (showcase?.requestFullscreen) {
      await showcase.requestFullscreen();
    } else {
      throw new Error("当前浏览器不支持全屏模式。");
    }
  } catch (error) {
    showStatus(error.message || "无法进入全屏模式。", { error: true });
  }
}

async function bootstrap() {
  if (!container || !shaderList) return;

  try {
    registry = await loadShaderRegistry();
    renderShaderList(registry);

    const savedPickerState = localStorage.getItem("shader-gallery-floating-picker-open");
    const defaultPickerOpen = window.matchMedia("(min-width: 641px)").matches;
    setPickerOpen(
      savedPickerState === null
        ? defaultPickerOpen
        : savedPickerState === "true",
      { persist: false }
    );

    const requestedId = decodeURIComponent(location.hash.slice(1));
    const initialEntry = registry.find((entry) => entry.id === requestedId);
    const initialId = initialEntry?.id || registry[0].id;

    await activateShader(initialId, { historyMode: "replace" });
  } catch (error) {
    console.error(error);
    showStatus(error.message || "着色器画廊初始化失败。", {
      error: true,
      retry: true
    });
  }
}

pickerToggle?.addEventListener("click", () => {
  setPickerOpen(picker.dataset.open !== "true");
});

fullscreenToggle?.addEventListener("click", toggleFullscreen);

retryButton?.addEventListener("click", () => {
  if (registry.length === 0) {
    bootstrap();
  } else {
    activateShader(requestedShaderId || registry[0].id, { force: true });
  }
});

container?.addEventListener("shadererror", (event) => {
  showStatus(event.detail?.error?.message || "着色器编译失败。", {
    error: true,
    retry: true
  });
});

document.addEventListener("fullscreenchange", () => {
  const isFullscreen = Boolean(document.fullscreenElement);
  fullscreenToggle?.setAttribute("aria-pressed", String(isFullscreen));
  if (fullscreenToggle) {
    fullscreenToggle.textContent = isFullscreen ? "退出全屏" : "全屏";
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && picker?.dataset.open === "true") {
    setPickerOpen(false);
    pickerToggle.focus();
    return;
  }

  if (
    event.target instanceof Element &&
    event.target.closest("button, a, input, textarea, select")
  ) return;

  if (event.key.toLowerCase() === "m") {
    setPickerOpen(picker?.dataset.open !== "true");
  }

  if (event.key.toLowerCase() === "f") {
    toggleFullscreen();
  }
});

window.addEventListener("popstate", () => {
  const id = decodeURIComponent(location.hash.slice(1));
  activateShader(id || registry[0]?.id);
});

window.addEventListener(
  "pagehide",
  () => {
    loadSequence += 1;
    currentShader?.canvas.dispose();
  },
  { once: true }
);

bootstrap();
