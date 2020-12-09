"use strict";
// вход
import APIBehavior from "./js/API.behavior.js";
import appData from "./js/app.data.js";

(async function () {
  await APIBehavior.getData();
  //   подключать файлы здесь
})();
