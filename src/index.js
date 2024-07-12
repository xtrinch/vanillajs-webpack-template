const variables = require("./variables.js");
import "./index.css";

window.addEventListener("DOMContentLoaded", (_event) => {
  const form = document.getElementById("form");
  form.addEventListener("submit", onClick);

  const formBack = document.getElementById("form-back");
  formBack.addEventListener("submit", () => redirect("#"));

  addEventListener("hashchange", () => {
    handleHash();
  });
  handleHash();

  const someTextELement = document.getElementById("some-text");
  someTextELement.innerHTML = variables.someText;
});

function onClick(e) {
  e.preventDefault();
  redirect("#success");
}

async function handleHash() {
  switch (window.location.hash) {
    case "#success":
      handleSuccess();
      break;
    case "":
    case "#":
    case null:
    case undefined: // if hash is in any way undefined
      handleDefault();
      break;
  }
}

function redirect(hash) {
  history.pushState({}, "", hash);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

// state handlers below
function handleSuccess() {
  const querySelector = document.querySelector("#success");
  querySelector.classList.add("active");
  querySelector.classList.remove("inactive");
  const querySelector1 = document.querySelector("#initial");
  querySelector1.classList.add("inactive");
  querySelector1.classList.remove("active");
}

function handleDefault() {
  const querySelector2 = document.querySelector("#success");
  querySelector2.classList.add("inactive");
  querySelector2.classList.remove("active");
  const querySelector3 = document.querySelector("#initial");
  querySelector3.classList.add("active");
  querySelector3.classList.remove("inactive");
}
