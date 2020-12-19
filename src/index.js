import APIBehavior from "./js/API.behavior.js";
import "./css/main.css";
import "./css/reset.css";
import "./css/info.scss";
import "./css/graph.scss";
import menu from "./js/info.js";
import graph from "./js/graph.js";
import "./css/search.css";
import "./css/sort.css";
import "./css/countries-list.css";
import "./css/map.css";
import countriesList from "./js/countries-list.create.js";
import searchBehavior from "./js/search.behavior.js";
import sort from "./js/sort.create.js";
import map from "./js/map.create.js";

(async () => {
  await APIBehavior.getData();
  await APIBehavior.getCountryDate();
  await APIBehavior.getGlobalFrom();
  menu.initEvents();
  graph.updateInfo();
  countriesList.create();
  searchBehavior.addOnChangeListener();
  sort.create();
  map.create();
})();
