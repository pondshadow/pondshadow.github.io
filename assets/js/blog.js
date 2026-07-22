const MANIFEST_URL = "./blogs/manifest.json";
const listSection = document.querySelector("[data-blog-list]");
const postArticle = document.querySelector("[data-blog-post]");
const postBody = document.querySelector("[data-blog-body]");
const backBtn = document.querySelector("[data-blog-back]");

let posts = [];

function renderPostList(items) {
  if (!items.length) {
    listSection.innerHTML = `<p class="blog-empty">还没有文章。</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  items.forEach((post, i) => {
    const card = document.createElement("a");
    card.className = "blog-card";
    card.href = `#/post/${post.id}`;
    card.style.setProperty("--card-index", i);

    const date = document.createElement("time");
    date.className = "blog-card__date";
    date.dateTime = post.date;
    date.textContent = post.date;

    const title = document.createElement("h2");
    title.className = "blog-card__title";
    title.textContent = post.title;

    const summary = document.createElement("p");
    summary.className = "blog-card__summary";
    summary.textContent = post.summary;

    const meta = document.createElement("span");
    meta.className = "blog-card__meta";
    meta.append(date);

    card.append(title, summary, meta);
    fragment.appendChild(card);
  });

  listSection.replaceChildren(fragment);
}

async function loadPost(id) {
  const post = posts.find((p) => p.id === id);
  if (!post || !window.marked || !postBody) return false;

  postBody.innerHTML = `<p class="blog-post__loading">正在载入文章…</p>`;
  postArticle.hidden = false;
  listSection.hidden = true;

  try {
    const resp = await fetch(post.file);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const md = await resp.text();

    // Configure rendering for repository-owned Markdown files.
    window.marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false
    });

    postBody.innerHTML = window.marked.parse(md);
    document.title = `${post.title} — 池边影の小站`;
    return true;
  } catch (error) {
    console.error(error);
    postBody.innerHTML = `
      <div class="blog-post__error">
        <p>文章加载失败。</p>
        <button type="button" data-blog-retry>重试</button>
      </div>`;
    postBody.querySelector("[data-blog-retry]")?.addEventListener("click", () => loadPost(id));
    return false;
  }
}

function showList({ updateHistory = true } = {}) {
  postArticle.hidden = true;
  listSection.hidden = false;
  document.title = "博客 — 池边影の小站";
  if (updateHistory) history.pushState(null, "", "./blog.html");
}

function parseRoute(hash) {
  const match = hash.match(/^#\/post\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

async function bootstrap() {
  try {
    const resp = await fetch(MANIFEST_URL);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    posts = await resp.json();

    // Sort by date descending
    posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));

    renderPostList(posts);

    // Check initial route
    const postId = parseRoute(location.hash);
    if (postId) {
      await loadPost(postId);
    }
  } catch (error) {
    console.error(error);
    if (listSection) {
      listSection.innerHTML = `<p class="blog-list__error">文章列表加载失败。</p>`;
    }
  }
}

// Navigation: click cards
listSection?.addEventListener("click", (event) => {
  const card = event.target.closest(".blog-card");
  if (!card) return;

  event.preventDefault();
  const postId = parseRoute(card.getAttribute("href"));
  if (postId) {
    history.pushState(null, "", card.getAttribute("href"));
    loadPost(postId);
  }
});

// Back button
backBtn?.addEventListener("click", showList);

// Browser back/forward
window.addEventListener("popstate", () => {
  const postId = parseRoute(location.hash);
  if (postId) {
    loadPost(postId);
  } else {
    showList({ updateHistory: false });
  }
});

bootstrap();
