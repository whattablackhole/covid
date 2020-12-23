"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _APIBehavior = _interopRequireDefault(require("./API.behavior.js"));

var _appData = _interopRequireDefault(require("./app.data.js"));

var _countriesListBehavior = _interopRequireDefault(require("./countries-list.behavior.js"));

var _sortData = require("./sort.data.js");

var _mapData = _interopRequireDefault(require("./map.data.js"));

var _mapBehavior = _interopRequireDefault(require("./map.behavior.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var countriesList = {
  create: function create() {
    var _this = this;

    var countries, totalData, ul, defaultCountryButton;
    return regeneratorRuntime.async(function create$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            countries = _appData["default"].countriesAPI;
            totalData = [];
            ul = document.querySelector(".countries__list");
            countries.forEach(function (country) {
              totalData = _APIBehavior["default"].getCountryData(country.alpha2Code);
              if (!totalData) return;
              var li = document.createElement("li");
              var countryContainer = document.createElement("button");
              var data = document.createElement("span");
              var flag = document.createElement("span");
              var name = document.createElement("span");
              countryContainer.classList.add("countries__item");
              data.classList.add("countries__data");
              flag.classList.add("countries__flag");
              name.classList.add("countries__country-name");
              data.setAttribute("data-cases", totalData.TotalConfirmed);
              data.setAttribute("data-deaths", totalData.TotalDeaths);
              data.setAttribute("data-recovered", totalData.TotalRecovered);
              data.setAttribute("data-new-cases", totalData.NewConfirmed);
              data.setAttribute("data-new-deaths", totalData.NewDeaths);
              data.setAttribute("data-new-recovered", totalData.NewRecovered);
              data.setAttribute("data-population", totalData.population);
              data.setAttribute("data-latlng", country.latlng);
              data.setAttribute("data-name", country.name);
              data.innerHTML = totalData[_sortData.valuesOfSortBy[_sortData.sortData.sortBy]];
              flag.style.backgroundImage = "url(".concat(country.flag, ")");
              name.innerHTML = country.name;
              countryContainer.append(data, flag, name);

              _this.addClickListener(countryContainer, country.alpha2Code, country.latlng);

              li.append(countryContainer);
              ul.append(li);
            });
            defaultCountryButton = document.querySelector(".countries__default-button");
            this.addClickListener(defaultCountryButton, "Global");
            this.addListenerFilters();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  addClickListener: function addClickListener(button, countryCode) {
    button.addEventListener("click", function () {
      _countriesListBehavior["default"].choseCountry(countryCode);
    });
  },
  changeValues: function changeValues() {
    var list = document.querySelectorAll(".countries__list li");
    var typeOfValues = _sortData.sortData.sortBy;
    var isByNew = _sortData.sortData["new"];
    var isBy100k = _sortData.sortData.to100k;
    list.forEach(function (element) {
      var spanElement = element.childNodes[0].childNodes[0];
      var population = element.childNodes[0].childNodes[0].getAttribute("data-population");
      var value = spanElement.dataset[typeOfValues];
      if (isByNew) value = spanElement.getAttribute("data-new-".concat(typeOfValues));
      if (isBy100k) value = Math.floor(value * 100000 / population);
      spanElement.innerHTML = "".concat(value);
    });
  },
  addListenerFilters: function addListenerFilters() {
    var _this2 = this;

    var buttonSwitchTo100k = document.querySelector(".countries__switch-to100k");
    var buttonSwitchToNew = document.querySelector(".countries__switch-toNew");
    buttonSwitchToNew.addEventListener("click", function () {
      buttonSwitchToNew.innerHTML = _mapData["default"].onlyNew ? "за последний день" : "за весь период";
      _sortData.sortData["new"] = !_sortData.sortData["new"];

      _this2.changeValues();

      if (_appData["default"].fullScreenZone !== "countries") return;

      _mapBehavior["default"].onButtonClickSimulation("toNew", "countries");
    });
    buttonSwitchTo100k.addEventListener("click", function () {
      buttonSwitchTo100k.innerHTML = _mapData["default"].onlyTo100k ? "за 100 тыс" : "в абсолютных величинах";
      _sortData.sortData.to100k = !_sortData.sortData.to100k;

      _this2.changeValues();

      if (_appData["default"].fullScreenZone !== "countries") return;

      _mapBehavior["default"].onButtonClickSimulation("to100k", "countries");
    });
  }
};
var _default = countriesList;
exports["default"] = _default;