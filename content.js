let overlay = null;

// 創建浮動面板
function createOverlay() {
  overlay = document.createElement("div");
  Object.assign(overlay.style, {
    position: "fixed",
    zIndex: "10000",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "white",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "12px",
    maxWidth: "300px",
    pointerEvents: "none",
    display: "none",
  });
  document.body.appendChild(overlay);
}

// 計算 XPath
function getXPath(element) {
  if (element.id) return `//*[@id="${element.id}"]`;
  if (element === document.body) return "/html/body";
  const index = [...element.parentNode.children].indexOf(element) + 1;
  return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${index}]`;
}

// 當滑鼠移動時更新
function onMouseMove(event) {
  const element = event.target;

  if (!element || element === overlay) return;

  const rect = element.getBoundingClientRect();
  const info = `
    <strong>Tag:</strong> ${element.tagName.toLowerCase()}<br>
    <strong>ID:</strong> ${element.id || "N/A"}<br>
    <strong>Class:</strong> ${[...element.classList].join(" ") || "N/A"}<br>
    <strong>XPath:</strong> ${getXPath(element)}<br>
    <strong>CSS Selector:</strong> ${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}${[...element.classList].map(cls => `.${cls}`).join("")}
  `;

  overlay.innerHTML = info;
  overlay.style.left = `${rect.left + window.scrollX + 10}px`;
  overlay.style.top = `${rect.top + window.scrollY + 10}px`;
  overlay.style.display = "block";

  // 高亮當前節點
  element.style.outline = "2px solid red";
  setTimeout(() => {
    element.style.outline = "";
  }, 200);
}

// 初始化
createOverlay();
document.addEventListener("mousemove", onMouseMove);
