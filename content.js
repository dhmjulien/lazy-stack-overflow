// Select the div that contains all the content of the "accepted" answer
const answer = document.querySelector(".accepted-answer");
// Select all the code snippets on the page and store it as a NodeList into "codes" variable
const codes = document.querySelectorAll("pre code");
 
/**
 * Function that copies a code snippet to clipboard
 * @param {String} snippet The content of the snippet
 */
const copyCode = (snippet) => {
  // Create a TextArea HTML element
  let input = document.createElement("textarea");
  // Append the newly created TextArea to the page
  document.body.appendChild(input);
  // Set the content
  input.textContent = snippet;
  // Select the content
  input.select();
  // Copy to clipboard
  document.execCommand("copy");
  // Deselect the content
  input.blur();
  // Remove the newly created tag
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
  // Create an HTML element which will contain our message
  let text = document.createElement(tag);
  // Apply the style
  text.style.color = style.color;
  text.style.float = style.float;
  text.style.margin = style.margin;
  // Set the content
  text.innerHTML = content;
  // Add our newly created tag to a parent node
  element.appendChild(text);
  // Delete the message after a givent time
  setTimeout(() => text.remove(), timeout);
};
 
// Loop trough all the codes snippets that are on the page
for (let i = 0; i < codes.length; i++) {
  // Store all the content of the current snippet into "snippet" variable
  let snippet = codes[i].innerHTML;
  // Set the style of the cursor to "pointer"
  codes[i].parentNode.style.cursor = "pointer";
  // Add an event listener on all the snippets that will listen for a double click
  codes[i].parentNode.addEventListener("dblclick", (e) => {
    // Copy the content
    copyCode(snippet);
    // Display that copy has worked well
    displayMessage("p", e.target, "📋 Successfully copied to clipboard");
  });
}
 
// Listen to a message that can be sent by the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // If there's an "accepted" answer on the page
  if (answer !== null) {
    // Scroll smoothly to it
    answer.scrollIntoView({ behavior: "smooth" });
  } else {
    // If not, tell the user there's none
    alert("🤖 Sadly, there's no official answer on this page");
  }
});