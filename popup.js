function updatePopupContent() {
    chrome.runtime.sendMessage({ type: "getLatestDomDetails" }, (response) => {
      if (response) {
        document.getElementById("dom-details").textContent = JSON.stringify(response, null, 2);
      } else {
        document.getElementById("dom-details").textContent = "等待滑鼠移動更新...";
      }
    });
  }
  
  // 每 200 毫秒更新一次
  setInterval(updatePopupContent, 200);
  