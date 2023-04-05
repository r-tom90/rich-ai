// https://www.youtube.com/watch?v=2FeymQoKvrk

import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

// Elements
const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

// Variables
let loadInterval;

function loader(e) {
  e.textContent = "";

  loadInterval = setInterval(() => {
    e.textContent += ".";

    if (e.textContent === "....") {
      e.textContent = "";
    }
  }, 300);
}

function typeText(e, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      e.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  // 16 characters
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
  return `
      <div class="wrapper ${isAi && "ai"}">
        <div class="chat">
          <div class="profile">
            <img 
              src="${isAi ? bot : user}"
              alt="${isAi ? "bot" : "user"}"
            />
          </div>
          <div class="message" id=${uniqueId}>${value}</div>
        <div>
      </div>
    `;
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // users chatStripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));
  // clears the text input
  form.reset();

  // bots chatStripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, "", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  // if keycode is enter (13)
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
