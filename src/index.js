import APIBehavior from "./js/API.behavior.js";
import countriesList from "./js/countries-list.create.js";
import searchBehavior from "./js/search.behavior.js";
import sort from "./js/sort.create.js";
// import './css/main.css';
// import './css/reset.css';

(async () => {
  await APIBehavior.getData();
  countriesList.create();
  searchBehavior.addOnChangeListener();
  sort.create();
})();
