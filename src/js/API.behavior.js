import appData from "./app.data.js";

const APIBehavior = {
  async getData() {
    await this.checkSavedData();
  },
  async dataFetch(src) {
    return fetch(`${src}`).then((response) => response.json());
  },
  async getCountryStats(countryName) {
    const request = `https://api.covid19api.com/country/${countryName}`;
    const country = await this.dataFetch(request);
    appData.countryStats = [...country];
    const request2 = `https://disease.sh/v3/covid-19/historical/${countryName}?lastdays=366`;
    const country2 = await this.dataFetch(request2);
    appData.countryStatsObj = { ...country2 };
  },
  async getGlobalStats() {
    const request =
      "https://disease.sh/v3/covid-19/historical/all?lastdays=366";
    const global = await this.dataFetch(request);
    appData.globalStats = {
      ...global,
    };
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
