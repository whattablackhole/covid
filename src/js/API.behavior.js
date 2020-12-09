import appData from './app.data.js';

const APIBehavior = {
  async getData() {
    // ссылки на API.
    const countriesAPISource = 'https://restcountries.eu/rest/v2/all?fields=name;population;flag';
    const covidAPISource = 'https://api.covid19api.com/summary';
    const countries = await this.dataFetch(countriesAPISource);
    const covid = await this.dataFetch(covidAPISource);
    appData.covidAPI = {
      ...covid,
    };
    appData.countriesAPI = [...countries];
    console.log(appData.countriesAPI);
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
};

export default APIBehavior;
