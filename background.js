// Listen to a click event on the extension's button
chrome.browserAction.onClicked.addListener(tab => {
  // Send the message that the button has been clicked
  chrome.tabs.sendMessage(tab.id, true);
});
