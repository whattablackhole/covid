import appData from "./app.data.js";

const countriesListBehavior = {
  choseCountry(countryCode) {
    appData.currentCountry = countryCode;
    console.log(appData.currentCountry);
  },
};

export default countriesListBehavior;
