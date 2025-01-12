function getXPath(element) {
    if (element.id) return `//*[@id="${element.id}"]`;
    if (element === document.body) return "/html/body";
    const index = [...element.parentNode.children].indexOf(element) + 1;
    return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${index}]`;
  }
  
  function onMouseMove(event) {
    const element = event.target;
  
    const domDetails = {
      tagName: element.tagName.toLowerCase(),
      id: element.id || "N/A",
      classList: [...element.classList].join(" ") || "N/A",
      xpath: getXPath(element),
      cssSelector: `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}${[...element.classList].map(cls => `.${cls}`).join("")}`,
      innerText: element.innerText.trim() || "（無文字內容）",
      innerHTML: element.innerHTML.trim() || "（無 HTML 內容）",
    };
  
    // 發送 DOM 資訊到 background.js
    chrome.runtime.sendMessage({ type: "updateDomDetails", data: domDetails });
  }
  
  // 初始化
  document.addEventListener("mousemove", onMouseMove);
  