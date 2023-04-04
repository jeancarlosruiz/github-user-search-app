'use strict';
/////////////////////////
// SELECTING ELEMENTS //
///////////////////////
const htmlEl = document.querySelector('html');
const btn = document.querySelector('.button');
const form = document.querySelector('.form');
const input = document.querySelector('.username-ipt');
const img = document.querySelector('.profile-img');
const username = document.querySelector('.profile-name');
const tagName = document.querySelector('.tag-name');
const joinDate = document.querySelector('.joined-date');
const bioDescription = document.querySelector('.user-bio');
const repos = document.querySelector('.repos');
const followers = document.querySelector('.followers');
const following = document.querySelector('.following');
const location = document.querySelector('.location');
const blogUrl = document.querySelector('.blog-url');
const twitterUsername = document.querySelector('.twitter-username');
const company = document.querySelector('.company');
const errorMessage = document.querySelector('.error-message');
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

// Getting format date "Joined 25 Jan 2011"
const formatDate = function (dateInput) {
  const dateOnly = dateInput.slice(0, 10);
  const date = new Date(dateOnly);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const finalDate = `Joined ${date.toLocaleDateString('en-GB', options)}`;

  return finalDate;
};

// Looking for availability
const availability = function (dataAvailability) {
  // If the data is false "Not available" or data
  return !dataAvailability ? 'Not available' : dataAvailability;
};

// Getting data user
const userData = function (data) {
  img.src = data.avatar_url;
  username.textContent = data.name;
  tagName.textContent = `@${data.login}`;
  joinDate.textContent = formatDate(data.created_at);
  bioDescription.textContent = data.bio;
  repos.textContent = data.public_repos;
  followers.textContent = data.followers;
  following.textContent = data.following;
  location.textContent = availability(data.location);
  blogUrl.textContent = availability(data.blog);
  blogUrl.href = data.blog;
  twitterUsername.textContent = availability(data.twitter_username);
  company.textContent = availability(data.company);
  input.value = '';
  errorMessage.textContent = '';
};

// Getting data user from input
const userDataInput = async function (userInput) {
  try {
    const resUser = await fetch(`https://api.github.com/users/${userInput}`);
    if (!resUser.ok) {
      errorMessage.textContent = 'Not results';
      input.value = '';
      throw new Error('Something went wrong through the process.');
    }
    const user = await resUser.json();
    userData(user);
  } catch (err) {
    console.error('There is an error in the request:', err);
  }
};

userDataInput('octocat');

/////////////////////////////
// ADDEVENT FUNCTIONALITIES //
///////////////////////////

btn.addEventListener('click', toggleTheme);

// Form addeventlistener
form.addEventListener('submit', e => {
  e.preventDefault();
  userDataInput(input.value);
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
