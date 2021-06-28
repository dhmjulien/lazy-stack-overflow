// Listen to a click event on the extension's button
chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, true);
});
