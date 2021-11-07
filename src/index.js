import './sass/main.scss';
import temp from './templates/country.hbs';
import liCountry from './templates/li-country.hbs';
import apiService from './api.js';
import { error, Stack } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

function errorPopup() {
  div.innerHTML = '';
  error({
    sticker: false,
    delay: '500',
    maxOpen: 1,
    maxTextHeight: null,
    closer: false,
    closerHover: true,
    title: false,
    text: 'Too many matches found. Please enter a more specific query!',
    stack: new Stack({
      modal: true,
      context: document.body,
    }),
  });
}

const debounce = require('lodash.debounce');
const input = document.querySelector('.input');
const div = document.querySelector('div');

input.addEventListener('input', debounce(country, 1000));

function country(e) {
  const curentCountry = e.target.value;

  if (curentCountry === '') {
    div.innerHTML = '';

    return;
  }

  apiService(curentCountry).then(data => {
    console.log(data);
    const arrayLength = data.length;

    if (arrayLength >= 2 && arrayLength <= 10) {
      div.innerHTML = '';
      renderCountryList(data);

      return;
    }

    if (arrayLength === 1) {
      div.innerHTML = '';
      renderCountry(data);
      return;
    }

    errorPopup();
  });
}

function renderCountryList(array) {
  const names = array.map(item => item.name);

  const markup = liCountry({ names });
  console.log(markup);
  div.insertAdjacentHTML('afterbegin', markup);
}

function renderCountry(nameCountry) {
  const country = temp(...nameCountry);

  div.insertAdjacentHTML('afterbegin', country);
}
