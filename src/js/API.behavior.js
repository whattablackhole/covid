import appData from './app.data.js';

const APIBehavior = {
  async getData() {
    // ссылки на API.
    // const countriesAPISource = 'https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code;';
    // const covidAPISource = 'https://api.covid19api.com/summary';
    // локальные API
    const countriesAPISource = './assets/countriesAPI.json';
    const covidAPISource = './assets/covidAPI.json';

    const countries = await this.dataFetch(countriesAPISource);
    const covid = await this.dataFetch(covidAPISource);
    appData.covidAPI = {
      ...covid,
    };
    appData.countriesAPI = [...countries];
  },
  async dataFetch(src) {
    return fetch(`${src}`).then((response) => response.json());
  },
  async getCountryDate() {
    const date = new Date();
    const today = date.toISOString().slice(0, 10);
    const name = 'Belarus';
    const date2 = new Date();
    date2.setDate(date2.getDate() - 1);
    const yesterday = date2.toISOString().slice(0, 10);
    const req = `https://api.covid19api.com/country/${name}?from=${yesterday}T00:00:00Z&to=${today}T00:00:00Z;`;
    const country = await this.dataFetch(req);
    appData.country = {
      ...country,
    };
  },
  getTotalCasesDeathsRecovered(CountryCode){
    let cases = null;
    let deaths = null;
    let recovered = null;
    let countries = appData.covidAPI.Countries

    countries.forEach(country => {
      
      if (country.CountryCode === CountryCode){
        cases = country.TotalConfirmed
        deaths = country.TotalDeaths
        recovered = country.TotalRecovered        
      }
    });
    return [cases, deaths, recovered];
  },
};

export default APIBehavior;
