import { fetchCountries } from './js/fetchCountries.js';
import countrieCardTpl from './templates/countries-card.hbs';
import countriesListTpl from './templates/countries-list.hbs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countrieInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputEvent, DEBOUNCE_DELAY));

function onInputEvent(evt) {
  const inputNameCountry = evt.target.value.trim();

  if (inputNameCountry.length === 0) {
    clearCountriesList(refs.countrieInfo);
    clearCountriesList(refs.countriesList);
    return;
  }

  fetchCountries(inputNameCountry)
    .then(countries => {
      return makeCountriesMarkup(countries);
    })
    .catch(errMessage);
}

function makeCountriesMarkup(countries) {
  if (countries.length > 10) {
    return Notify.info('Too many matches found. Please enter a more specific name.');
  }
  if (countries.length > 2) {
    clearCountriesList(refs.countrieInfo);
    return (refs.countriesList.innerHTML = countriesListTpl(countries));
  }
  clearCountriesList(refs.countriesList);
  countries.map(({ name, flags, capital, population, languages }) => {
    const capitalOfCountrie = capital.join('');
    const languagesOfCountrie = Object.values(languages).join(', ');
    refs.countrieInfo.innerHTML = countrieCardTpl({
      name,
      flags,
      capitalOfCountrie,
      population,
      languagesOfCountrie,
    });
  });
}

function errMessage() {
  Notify.failure('Oops, there is no country with that name');
}

function clearCountriesList(list) {
  list.innerHTML = '';
}
