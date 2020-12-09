"use strict";
// вход
import APIBehavior from "./js/API.behavior.js";
import appData from "./js/app.data.js";

(async function () {
  let a = await APIBehavior.getData();
})();

// вопрос: как дождаться выполнения запроса к API? данные в консоли 👇 пустые
console.log(appData.covidAPI, appData.countriesAPI);
