const REQUIRED_FIELDS = [
  "id",
  "index",
  "title",
  "subtitle",
  "description",
  "principle",
  "unrealApplication",
  "vertex",
  "fragment"
];

export async function loadShaderRegistry(
  url = new URL("../../../shaders/manifest.json", import.meta.url)
) {
  const response = await fetch(url, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error(
      `无法加载着色器清单 (${response.status} ${response.statusText})`
    );
  }

  const entries = await response.json();

  if (!Array.isArray(entries) || entries.length === 0) {
    throw new Error("着色器清单必须包含至少一个作品。");
  }

  const ids = new Set();

  return entries.map((entry, entryIndex) => {
    for (const field of REQUIRED_FIELDS) {
      if (typeof entry[field] !== "string" || entry[field].trim() === "") {
        throw new Error(`着色器清单第 ${entryIndex + 1} 项缺少 ${field}。`);
      }
    }

    if (ids.has(entry.id)) {
      throw new Error(`着色器 id 重复：${entry.id}`);
    }

    ids.add(entry.id);

    return Object.freeze({
      ...entry,
      vertexUrl: new URL(entry.vertex, document.baseURI),
      fragmentUrl: new URL(entry.fragment, document.baseURI)
    });
  });
}
