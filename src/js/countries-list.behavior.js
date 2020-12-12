import appData from "./app.data.js";

const countriesListBehavior = {
  choseCountry(countryCode) {
    appData.currentCountry = countryCode;
    console.log(appData.currentCountry);
    //запустить обновления блоков
  },
};

export default countriesListBehavior;
