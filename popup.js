let isPaused = false; // 用於控制更新是否暫停

// Command 鍵按下
document.addEventListener("keydown", (event) => {
  if (event.key === "Meta" || event.key === "Control") {
    isPaused = true; // 暫停更新
  }
});

// Command 鍵放開
document.addEventListener("keyup", (event) => {
  if (event.key === "Meta" || event.key === "Control") {
    isPaused = false; // 恢復更新
  }
});

function updatePopupContent() {
  if (isPaused) return; // 如果處於暫停狀態，跳過更新

  chrome.runtime.sendMessage({ type: "getLatestDomDetails" }, (response) => {
    if (response) {
      document.getElementById("dom-details").textContent = JSON.stringify(response, null, 2);

      
      document.getElementById("element-text").textContent = response.innerText || "（無文字內容）";
      document.getElementById("element-html").textContent = response.innerHTML || "（無 HTML 內容）";
    } else {
      document.getElementById("dom-details").textContent = "Waiting for mouse movement update...";
      document.getElementById("element-text").textContent = "No Text Content";
      document.getElementById("element-html").textContent = "No HTML Content";
    }
  });
}

setInterval(updatePopupContent, 200);
