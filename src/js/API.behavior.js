import appData from "./app.data.js";

const APIBehavior = {
  async getData() {
    // ссылки на API.
    // let countriesAPISource =
    //   "https://restcountries.eu/rest/v2/all?fields=name;population;flag";
    // let covidAPISource = "https://api.covid19api.com/summary";

    let countriesAPISource = "./assets/countriesAPI.json";
    let covidAPISource = "./assets/covidAPI.json";

    let countries = await this.dataFetch(countriesAPISource);
    let covid = await this.dataFetch(covidAPISource);

    appData.covidAPI = { ...covid };
    appData.countriesAPI = [...countries];
  },
  async dataFetch(src) {
    return fetch(`${src}`).then((response) => response.json());
  },
};

export default APIBehavior;
