/* eslint-disable */
import appData from "./app.data.js";
import graph from "./graph.js";
import info from "./info.js";

const countriesListBehavior = {
  choseCountry(countryCode) {
    appData.CountryCode = countryCode;
    graph.updateInfo();
    info.updateInfo();
    console.log(appData.currentCountry);
  },
};

export default countriesListBehavior;
