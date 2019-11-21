const bg = chrome.extension.getBackgroundPage();
const head = document.querySelector('head');
const title = document.querySelector('h2');
const display = document.getElementById('display');

chrome.runtime.onMessage.addListener((request, sender) => {
  let source = request.payload;

  if (source.accepted) {
    head.innerHTML = source.links;
    title.innerHTML = 'Solution'
    display.innerHTML = source.content;
  } else {
    title.innerHTML = 'There\'s no accepted solution on this page :('
  }

});

window.addEventListener('load', () => {
  chrome.tabs.executeScript(null, {
    file: 'getSource.js'
  }, () => {
    if (chrome.runtime.lastError) {
      display.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
});