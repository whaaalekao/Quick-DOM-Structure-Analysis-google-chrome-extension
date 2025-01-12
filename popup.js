let isPaused = false; // 用於控制更新是否暫停

// 檢測 Command 鍵按下
document.addEventListener("keydown", (event) => {
  if (event.key === "Meta") { // 在 macOS 上，Command 鍵的 key 是 "Meta"
    isPaused = true; // 暫停更新
  }
});

// 檢測 Command 鍵釋放
document.addEventListener("keyup", (event) => {
  if (event.key === "Meta") {
    isPaused = false; // 恢復更新
  }
});

function updatePopupContent() {
  if (isPaused) return; // 如果處於暫停狀態，跳過更新

  chrome.runtime.sendMessage({ type: "getLatestDomDetails" }, (response) => {
    if (response) {
      document.getElementById("dom-details").textContent = JSON.stringify(response, null, 2);

      // 顯示元素的內容
      document.getElementById("element-text").textContent = response.innerText || "（無文字內容）";
      document.getElementById("element-html").textContent = response.innerHTML || "（無 HTML 內容）";
    } else {
      document.getElementById("dom-details").textContent = "等待滑鼠移動更新...";
      document.getElementById("element-text").textContent = "（無文字內容）";
      document.getElementById("element-html").textContent = "（無 HTML 內容）";
    }
  });
}

// 每 200 毫秒更新一次
setInterval(updatePopupContent, 200);
