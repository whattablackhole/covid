import APIBehavior from './js/API.behavior.js';
import countriesList from './js/countries-list.create.js';
// import './css/main.css';
// import './css/reset.css';

(async function () {
  await APIBehavior.getData();
  countriesList.create();
})();

