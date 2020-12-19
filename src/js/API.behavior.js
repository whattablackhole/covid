import appData from "./app.data.js";

const APIBehavior = {
  async getData() {
    // ссылки на API.
    const countriesAPISource =
      "https://restcountries.eu/rest/v2/all?fields=name;population;flag";
    const covidAPISource = "https://api.covid19api.com/summary";
    const globalSource = "https://api.covid19api.com/world/total";
    const countries = await this.dataFetch(countriesAPISource);
    const covid = await this.dataFetch(covidAPISource);
    const global = await this.dataFetch(globalSource);
    appData.global = {
      ...global,
    };
    appData.covidAPI = {
      ...covid,
    };
    appData.countriesAPI = [...countries];
    console.log(appData.global);
  },
  async dataFetch(src) {
    return fetch(`${src}`).then((response) => response.json());
  },
  async getCountryDate() {
    const date = new Date();
    const today = date.toISOString().slice(0, 10);
    console.log(today);
    const name = "Belarus";
    const date2 = new Date();
    date2.setDate(date2.getDate() - 2);
    const yesterday = date2.toISOString().slice(0, 10);
    console.log(yesterday);
    const req = `https://api.covid19api.com/country/${name}?from=${yesterday}T00:00:00Z&to=${today}T00:00:00Z;`;
    console.log(req);
    const country = await this.dataFetch(req);
    console.log(country);
    appData.country = {
      ...country,
    };
  },
  async getGlobalFrom() {
    const request = "https://api.covid19api.com/country/Belarus";
    const country = await this.dataFetch(request);
    const date = country[0].Date;
    const req = `https://api.covid19api.com/world?from=${date}`;
    const global = await this.dataFetch(req);
    appData.globalStats = {
      ...global,
    };
    appData.countryStats = [...country];
  },
};

export default APIBehavior;
