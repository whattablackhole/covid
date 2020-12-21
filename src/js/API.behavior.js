import appData from "./app.data.js";

const APIBehavior = {
  async getData() {
    await this.checkSavedData();
  },
  async dataFetch(src) {
    return fetch(`${src}`).then((response) => response.json());
  },
  // async getCountryDate(countryName) {
  //   const date = new Date();
  //   const today = date.toISOString().slice(0, 10);
  //   const name = countryName;
  //   const date2 = new Date();
  //   date2.setDate(date2.getDate() - 2);
  //   const yesterday = date2.toISOString().slice(0, 10);
  //   const req = `https://api.covid19api.com/country/${name}?from=${yesterday}T00:00:00Z&to=${today}T00:00:00Z;`;
  //   const country = await this.dataFetch(req);
  //   appData.country = {
  //     ...country,
  //   };
  // },
  async getGlobalFrom(countryName) {
    const request = `https://api.covid19api.com/country/${countryName}`;
    const country = await this.dataFetch(request);
    const date = country[0].Date;
    const requestTwo = `https://api.covid19api.com/world?from=${date}`;
    const global = await this.dataFetch(requestTwo);
    appData.globalStats = {
      ...global,
    };
    appData.countryStats = [...country];
  },
  getCountryData(CountryCode) {
    const countriesCovidAPI = appData.covidAPI.Countries;
    const countriesCountriesAPI = appData.countriesAPI;
    const countryCovidAPI = countriesCovidAPI.find(
      (elem) => elem.CountryCode === CountryCode
    );
    const countryCountriesAPI = countriesCountriesAPI.find(
      (elem) => elem.alpha2Code === CountryCode
    );
    if (!countryCovidAPI) return undefined;
    const {
      TotalConfirmed,
      TotalDeaths,
      TotalRecovered,
      NewConfirmed,
      NewDeaths,
      NewRecovered,
    } = countryCovidAPI;
    const { population } = countryCountriesAPI;
    return {
      TotalConfirmed,
      TotalDeaths,
      TotalRecovered,
      NewConfirmed,
      NewDeaths,
      NewRecovered,
      population,
    };
  },
  async checkSavedData() {
    if (localStorage.covidAPI && localStorage.countriesAPI) {
      const currentDate = new Date().toISOString().slice(0, 10);
      const lastUpdateDate = JSON.parse(localStorage.covidAPI).Date.slice(
        0,
        10
      );
      if (lastUpdateDate !== currentDate) {
        await this.updateAPI();
      }
      const updateDOM = document.querySelector(".countries__last-update span");
      updateDOM.innerHTML = `Последнее обновление: ${lastUpdateDate}`;
      appData.covidAPI = JSON.parse(localStorage.covidAPI);
      appData.countriesAPI = JSON.parse(localStorage.countriesAPI);
    } else {
      await this.updateAPI();
    }
  },
  async updateAPI() {
    const countriesAPISource =
      "https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code;latlng";
    const covidAPISource = "https://api.covid19api.com/summary";

    const covid = await this.dataFetch(covidAPISource);
    const countries = await this.dataFetch(countriesAPISource);

    if (covid.Message === "Caching in progress") {
      alert("Updating data.");
      return;
    }

    localStorage.covidAPI = JSON.stringify(covid);
    localStorage.countriesAPI = JSON.stringify(countries);
    appData.covidAPI = {
      ...covid,
    };
    appData.countriesAPI = [...countries];

    const updateDOM = document.querySelector(".countries__last-update span");
    const lastUpdateDate = JSON.parse(localStorage.covidAPI).Date.slice(0, 10);
    updateDOM.innerHTML = `Последнее обновление: ${lastUpdateDate}`;
  },
};
export default APIBehavior;
