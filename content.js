/**
 * Function that copies a code snippet to clipboard
 * @param {String} snippet The content of the snippet
 */
 const copyCode = (snippet) => {
  let input = document.createElement("textarea");
  document.body.appendChild(input);
  input.textContent = snippet;
  input.select();
  document.execCommand("copy");
  input.blur();
  input.remove();
};
 
/**
 * Function that displays a text for a given time into a DOM element
 * @param {String} tag The HTML tag
 * @param {HTMLElement} element The parent node you want your message to be in
 * @param {String} content The text that you want to display
 * @param {Number} timeout The time in ms you want your message to be displayed
 * @param {Object} style An object defining the style of your message
 */
const displayMessage = (
  tag,
  element,
  content,
  timeout = 4000,
  style = {
    color: "green",
    float: "right",
    margin: "20px",
  }
) => {
  let text = document.createElement(tag);
  text.style.color = style.color;
  text.style.float = style.float;
  text.style.margin = style.margin;
  text.innerHTML = content;
  element.appendChild(text);
  setTimeout(() => text.remove(), timeout);
};

/**
 * Utility function to calculate the offset of an element relative to the page
 * @param {HTMLElement} el The HTML element
 * @returns Object: { top, left }
 */
const offset = (el) => {
  var rect = el.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
};

const codes = document.querySelectorAll("pre code");

// Give all code snippets the "copy to clipboard" super power
codes.forEach((code) => {
  let snippet = code.innerHTML;
  code.parentNode.style.cursor = "pointer";
  code.parentNode.addEventListener("dblclick", (e) => {
    copyCode(snippet);
    displayMessage("p", e.target, "📋 Successfully copied to clipboard");
  });
})
 
// Listen to a message that can be sent by the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const answer = document.querySelector(".accepted-answer");
  const headerHeight = 47;
  
  if (answer) {
    let scrollPosition = offset(answer).top - headerHeight;
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth"
    });
  } else {
    alert("🤖 Sadly, there's no official answer on this page");
  }
});