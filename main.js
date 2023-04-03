'use strict';
/////////////////////////
// SELECTING ELEMENTS //
///////////////////////
const htmlEl = document.querySelector('html');
const btn = document.querySelector('.button');
const form = document.querySelector('.form');
const input = document.querySelector('.username-ipt');
const error = document.querySelector('.error-message');
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
let scheme = document.querySelector('.scheme');

//////////////////////////////////////
// FUNCTIONS TO DO NOT REPEAT CODE //
////////////////////////////////////

// function
function toggleTheme() {
  const prefersDark = mediaQuery.matches;

  // Getting the current theme
  const currentTheme = localStorage.getItem('theme');

  //   If the current theme is dark or current theme is not defind and prefers-color-scheme is set to dark:
  if (currentTheme === 'dark' || (currentTheme === null && prefersDark)) {
    // Set attribute to the document to light
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    // Change the text content of the button to Dark
    scheme.textContent = 'Dark';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    scheme.textContent = 'Light';
  }
}

/////////////////////////////
// ADDEVENT FUNCTIONALITIES //
///////////////////////////

btn.addEventListener('click', toggleTheme);

// Form addeventlistener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = input.value;

  fetch(`https://api.github.com/users/${username}`)
    .then(response => {
      if (!response.ok) {
        error.textContent = 'No results';
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      input.value = '';
    });
});

window.addEventListener('load', () => {
  // If the page load and there is not preferences to dark mode set it light by default
  if (!mediaQuery.matches) {
    htmlEl.dataset.teme = 'light';
    // If data-theme is equal to light btn text content = Dark
    scheme.textContent = 'Dark';
  } else {
    htmlEl.dataset.theme = 'dark';
    // If data-theme is equal to dark btn text content = Light
    scheme.textContent = 'Light';
  }
});
