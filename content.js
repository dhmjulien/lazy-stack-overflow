const answer = document.querySelector('.accepted-answer');
const codes = document.querySelectorAll('pre code');

const copyCode = snippet => {
  let input = document.createElement('textarea');
  document.body.appendChild(input);
  input.textContent = snippet;
  input.select();
  document.execCommand('copy');
  input.blur();
  input.remove();
}

const displayCopy = element => {
  let copied = document.createElement('h3');
  copied.style.color = 'green';
  copied.style.float = 'right';
  copied.style.margin = '20px';
  copied.innerHTML = 'Copied to clipboard!';
  element.appendChild(copied);
  setTimeout(() => copied.remove(), 3000);
}

if (answer !== null) {
  answer.scrollIntoView({ behavior: 'smooth' });
}

for (let i = 0; i < codes.length; i++) {
  let snippet = codes[i].innerHTML;
  codes[i].parentNode.style.cursor = 'pointer';
  codes[i].parentNode.addEventListener('dblclick', () => {
    copyCode(snippet);
    displayCopy(codes[i].parentNode);
  });
}
