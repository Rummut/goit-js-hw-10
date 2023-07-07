import axios from 'axios';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { JSONArrayAPI } from './cat-api';
axios.defaults.headers.common['x-api-key'] =
  'live_eaoy0NBQRAaM2g87waEAE5wIJFurROmL3GXkUa9BFt7btU42gpBfL8h1uA6iorCK';

const selectIdEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const loaderAnimationEl = document.querySelector('.loader-animation')

loaderEl.classList.toggle('is-hidden');
selectIdEl.classList.toggle('is-hidden');
loaderAnimationEl.classList.toggle('is-hidden')

const jsonArrayInstance = new JSONArrayAPI();

window.addEventListener(
  'load',
  debounce(() => {
    loaderEl.classList.toggle('is-hidden');
    setTimeout(() => {
      createSelect();
      loaderAnimationEl.classList.toggle('is-hidden');
      loaderEl.classList.toggle('is-hidden');
      selectIdEl.classList.toggle('is-hidden');
    }, 1000);
  }, 0)
);

//create select
function createSelect() {
  jsonArrayInstance
    .fetchBreeds()
    .then(data => {
      const markup = data
        .map(el => `<option value = ${el.id}>${el.name}</option>`)
        .join('');
      selectIdEl.insertAdjacentHTML('beforeend', markup);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');;
    });
}

//add and delete loader
selectIdEl.addEventListener(
  'change',
  debounce(() => {
    loaderAnimationEl.classList.toggle('is-hidden');
    loaderEl.classList.toggle('is-hidden');
    setTimeout(() => {
      setOutput();
      loaderEl.classList.toggle('is-hidden');
      loaderAnimationEl.classList.toggle('is-hidden');
    }, 1000);
  }, 0)
);

//add common markup
function setOutput() {
  const selectedOptionValue = selectIdEl.value

  //add img
  jsonArrayInstance
    .fetchCatByBreed(selectedOptionValue)
    .then(data => {
      const markupImg = data
        .map(el => `<img src="${el.url}" alt='' width = 600>`)
        .join('');
      catInfoEl.innerHTML = ""
      catInfoEl.insertAdjacentHTML('beforeend', markupImg)
    })
    .catch(error => {
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
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
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');;

    });
}
