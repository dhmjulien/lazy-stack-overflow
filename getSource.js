const extractDOM = documentRoot => {
  let source = {
    accepted: false,
    links: '',
    content: ''
  };

  if (documentRoot.querySelector('.accepted-answer') !== null) {
    source.accepted = true;
    source.links += documentRoot.querySelector('head').innerHTML;
    source.content += documentRoot.querySelector('.accepted-answer pre').parentNode.innerHTML;
  }
  
  return source;
};

chrome.runtime.sendMessage({
  action: 'getSource',
  payload: extractDOM(document)
});