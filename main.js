'use strict';
/////////////////////////
// SELECTING ELEMENTS //
///////////////////////
const btn = document.querySelector('.button');
const htmlEl = document.querySelector('html');
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
