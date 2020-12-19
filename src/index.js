import APIBehavior from "./js/API.behavior.js";
import countriesList from "./js/countries-list.create.js";
import searchBehavior from "./js/search.behavior.js";
import sort from "./js/sort.create.js";
import map from "./js/map.create.js";
import "./css/main.css";
import "./css/reset.css";
import "./css/search.css";
import "./css/sort.css";
import "./css/countries-list.css";
import "./css/map.css";

(async () => {
  await APIBehavior.getData();
  countriesList.create();
  searchBehavior.addOnChangeListener();
  sort.create();
  map.create();
})();
