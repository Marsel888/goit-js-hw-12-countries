export default apiService;
import countryRender from './templates/country.hbs';
import liCountry from './templates/li-country.hbs';

function apiService(curentCountry) {
  try {
    const data = fetch(`https://restcountries.com/v2/name/${curentCountry}`).then(response => response.json());
    return data
  } catch (error) {
    console.log(error => console.log(error , "ОШИЬКА!!!"));
  }

  // return apiService;
}




