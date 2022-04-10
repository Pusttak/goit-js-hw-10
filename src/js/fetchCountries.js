const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filterResponse = '?fields=name,capital,population,flags,languages';

export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${filterResponse}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => {
      return countries;
    })
    .catch(console.log);
}
