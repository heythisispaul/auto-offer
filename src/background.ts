chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "reminder") {
    chrome.action.setPopup({ popup: "popup.html?reminder=true" });
    chrome.action.openPopup();
  }
});

// Subscribe to the popup port and listen for disconnects.
// Essentially this functions as the "onClose" event for the popup.
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "popup") {
    port.onDisconnect.addListener(() => {
      chrome.action.setPopup({ popup: "popup.html" });
    });
  }
});
