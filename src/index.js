import APIBehavior from "./js/API.behavior.js";
import "./css/main.css";
import "./css/reset.css";
import "./css/info.scss";
import "./css/graph.scss";
import menu from "./js/info.js";
import graph from "./js/graph.js";

require("./js/graph.js");

(async function () {
  await APIBehavior.getData();
  await APIBehavior.getCountryDate();
  await APIBehavior.getGlobalFrom();
  menu.initEvents();
  graph.updateInfo();
})();
// .then(() => { ; });
