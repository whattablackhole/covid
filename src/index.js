import APIBehavior from "./js/API.behavior.js";
import menu from "./js/info.js";
import graph from "./js/graph.js";
import countriesList from "./js/countries-list.create.js";
import searchBehavior from "./js/search.behavior.js";
import sort from "./js/sort.create.js";
import map from "./js/map.create.js";
import appBehavior from "./js/app.behavior.js";
import "./css/main.css";
import "./css/reset.css";
import "./css/info.scss";
import "./css/graph.scss";
import "./css/search.css";
import "./css/sort.css";
import "./css/countries-list.css";
import "./css/map.css";
import "./css/fullscreenButton.css";
import "./css/fullscreen.css";
import "./css/buttons.scss";
import "./css/scrollbar.css";
import "./css/footer.css";

(async () => {
  await APIBehavior.getData();
  menu.initEvents();
  graph.updateInfo();
  countriesList.create();
  searchBehavior.addOnChangeListener();
  sort.create();
  map.create();
  appBehavior.addMouseoverListeners();
  appBehavior.addFullscreenClick();
})();
