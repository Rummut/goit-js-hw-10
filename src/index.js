import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { JSONArrayAPI } from './cat-api';
axios.defaults.headers.common['x-api-key'] =
  'live_eaoy0NBQRAaM2g87waEAE5wIJFurROmL3GXkUa9BFt7btU42gpBfL8h1uA6iorCK';

const selectIdEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const loaderAnimationEl = document.querySelector('.loader-animation');
const buttonEl = document.querySelector('.button');

// loaderEl.classList.toggle('is-hidden');
selectIdEl.classList.toggle('is-hidden');
loaderAnimationEl.classList.toggle('is-hidden');
buttonEl.classList.toggle('is-hidden');

const jsonArrayInstance = new JSONArrayAPI();

window.addEventListener('load', () => {
  setTimeout(() => {
    createSelect();
    loaderAnimationEl.classList.toggle('is-hidden');
    loaderEl.classList.toggle('is-hidden');
    selectIdEl.classList.toggle('is-hidden');
  }, 1000);
});

//create select
function createSelect() {
  jsonArrayInstance
    .fetchBreeds()
    .then(data => {
      const markup = data
        .map(el => `<option value = ${el.id}>${el.name}</option>`)
        .join('');
      selectIdEl.insertAdjacentHTML('beforeend', markup);
      new SlimSelect({
        select: '#selectElement',
      });
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

//add and delete loader
selectIdEl.addEventListener('change', () => {
  loaderEl.classList.toggle('is-hidden');
  loaderAnimationEl.classList.toggle('is-hidden');
  setTimeout(() => {
    setOutput();
  }, 1000);
});

//add common markup
function setOutput() {
  const selectedOptionValue = selectIdEl.value;

  //add img
  jsonArrayInstance
    .fetchCatByBreed(selectedOptionValue)
    .then(data => {
      const markupImg = data
        .map(el => `<img src="${el.url}" alt='' width = 600px>`)
        .join('');
      catInfoEl.innerHTML = '';
      catInfoEl.insertAdjacentHTML('beforeend', markupImg);
      loaderEl.classList.toggle('is-hidden');
      loaderAnimationEl.classList.toggle('is-hidden');
      buttonEl.classList.remove('is-hidden');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });

  //add markup about cat
  jsonArrayInstance
    .fetchBreeds()
    .then(data => {
      const markupDescription = data
        .map(el => {
          if (selectedOptionValue === el.id) {
            return `<h1>${el.name}</h1>
          <p>${el.description}<h2>Temperament</h2><p>${el.temperament}</p>`;
          }
        })
        .join('');

      catInfoEl.insertAdjacentHTML('afterbegin', markupDescription);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
