import { camelCase, contrastRatio, hexToRgb, isEmail, slugify } from '../src/index.ts';

const text = document.querySelector('#text');
const email = document.querySelector('#email');
const color = document.querySelector('#color');

function updateText() {
  document.querySelector('#slug').textContent = slugify(text.value);
  document.querySelector('#camel').textContent = camelCase(text.value);
}

function updateEmail() {
  document.querySelector('#email-result').textContent = String(isEmail(email.value));
}

function updateColor() {
  document.querySelector('#rgb').textContent = JSON.stringify(hexToRgb(color.value));
  document.querySelector('#contrast').textContent = contrastRatio(color.value, '#ffffff').toFixed(2);
}

text.addEventListener('input', updateText);
email.addEventListener('input', updateEmail);
color.addEventListener('input', updateColor);

updateText();
updateEmail();
updateColor();
