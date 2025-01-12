let latestDomDetails = null;

// 接收 DOM 資訊並存儲
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateDomDetails") {
    latestDomDetails = message.data;
  }
});

// 向 popup.js 提供最新的 DOM 資訊
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getLatestDomDetails") {
    sendResponse(latestDomDetails);
  }
});
