"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appData = _interopRequireDefault(require("./app.data.js"));

var _mapBehavior = _interopRequireDefault(require("./map.behavior.js"));

var _graph = _interopRequireDefault(require("./graph.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var info = {
  leftArrow: document.querySelector(".info-arrow-left"),
  rightArrow: document.querySelector(".info-arrow-right"),
  deathTotalNumber: document.querySelector(".info-death"),
  weakTotalNumber: document.querySelector(".info-weak"),
  recoverTotalNumber: document.querySelector(".info-recover"),
  dayTime: document.querySelector(".info-day-time"),
  totalTime: document.querySelector(".info-whole-time"),
  toggleTwo: document.querySelector(".toggle-two"),
  strictNumber: document.querySelector(".info-strict-number"),
  totalNumber: document.querySelector(".info-total-number"),
  countryName: document.querySelector(".info-country"),
  country: null,
  isTotalNumberSet: true,
  isStrictNumberSet: false,
  isTotalTimeSet: true,
  isStrictTimeSet: false,
  currentPopulation: null,
  initEvents: function initEvents() {
    return regeneratorRuntime.async(function initEvents$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            this.updateInfo();
            this.rightArrow.addEventListener("click", this.changeText.bind(this));
            this.leftArrow.addEventListener("click", this.changeText.bind(this));
            this.toggleTwo.querySelector(".info-arrow-left").addEventListener("click", this.changeText.bind(this));
            this.toggleTwo.querySelector(".info-arrow-right").addEventListener("click", this.changeText.bind(this));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  changeText: function changeText(e) {
    if (e.currentTarget.parentElement.classList.contains("toggle-one")) {
      this.dayTime.classList.toggle("hide");
      this.totalTime.classList.toggle("hide");
      if (_appData["default"].fullScreenZone === undefined || _appData["default"].fullScreenZone === "info") _mapBehavior["default"].onButtonClickSimulation("toNew", "info");
    } else {
      this.totalNumber.classList.toggle("hide");
      this.strictNumber.classList.toggle("hide");
      if (_appData["default"].fullScreenZone === undefined || _appData["default"].fullScreenZone === "info") _mapBehavior["default"].onButtonClickSimulation("to100k", "info");
    }

    this.updateInfo();

    _graph["default"].updateInfo();
  },
  updateInfo: function updateInfo() {
    this.checkState();
    this.findCountry();
    this.calcPopulation();

    if (_appData["default"].CountryCode === "Global") {
      this.countryName.textContent = "Global";

      if (this.isTotalTimeSet && this.isTotalNumberSet) {
        this.deathTotalNumber.innerHTML = "Total Deaths : ".concat(_appData["default"].covidAPI.Global.TotalDeaths, " ");
        this.weakTotalNumber.innerHTML = " Total Recovered : ".concat(_appData["default"].covidAPI.Global.TotalRecovered, " ");
        this.recoverTotalNumber.innerHTML = " Total Confirmed : ".concat(_appData["default"].covidAPI.Global.TotalConfirmed, " ");
      }

      if (this.isStrictTimeSet && this.isTotalNumberSet) {
        this.deathTotalNumber.innerHTML = " New Deaths : ".concat(_appData["default"].covidAPI.Global.NewDeaths, " ");
        this.weakTotalNumber.innerHTML = " New Recovered : ".concat(_appData["default"].covidAPI.Global.NewRecovered, " ");
        this.recoverTotalNumber.innerHTML = " New Confirmed : ".concat(_appData["default"].covidAPI.Global.NewConfirmed, " ");
      }

      if (this.isTotalTimeSet && this.isStrictNumberSet) {
        this.deathTotalNumber.innerHTML = " Total Death/100 : ".concat(Math.trunc(_appData["default"].covidAPI.Global.TotalDeaths * 100000 / this.currentPopulation));
        this.weakTotalNumber.innerHTML = " Total Recovered/100: ".concat(Math.trunc(_appData["default"].covidAPI.Global.TotalRecovered * 100000 / this.currentPopulation), " ");
        this.recoverTotalNumber.innerHTML = " Total Confirmed/100 : ".concat(Math.trunc(_appData["default"].covidAPI.Global.TotalConfirmed * 100000 / this.currentPopulation), " ");
      }

      if (this.isStrictTimeSet && this.isStrictNumberSet) {
        this.deathTotalNumber.innerHTML = " New Death/100 : ".concat(Math.trunc(_appData["default"].covidAPI.Global.NewDeaths * 100000 / this.currentPopulation));
        this.weakTotalNumber.innerHTML = " New Recovered/100: ".concat(Math.trunc(_appData["default"].covidAPI.Global.NewRecovered * 100000 / this.currentPopulation), " ");
        this.recoverTotalNumber.innerHTML = " New Confirmed/100 : ".concat(Math.trunc(_appData["default"].covidAPI.Global.NewConfirmed * 100000 / this.currentPopulation), " ");
      }
    } else {
      this.countryName.textContent = "".concat(this.country.Country);

      if (this.isTotalTimeSet && this.isTotalNumberSet) {
        this.deathTotalNumber.innerHTML = "Total Deaths : ".concat(this.country.TotalDeaths, " ");
        this.weakTotalNumber.innerHTML = " Total Recovered : ".concat(this.country.TotalRecovered, " ");
        this.recoverTotalNumber.innerHTML = " Total Confirmed : ".concat(this.country.TotalConfirmed, " ");
      }

      if (this.isStrictTimeSet && this.isTotalNumberSet) {
        this.deathTotalNumber.innerHTML = " New Deaths : ".concat(this.country.NewDeaths, " ");
        this.weakTotalNumber.innerHTML = " New Recovered : ".concat(this.country.NewRecovered, " ");
        this.recoverTotalNumber.innerHTML = " New Confirmed : ".concat(this.country.NewConfirmed, " ");
      }

      if (this.isTotalTimeSet && this.isStrictNumberSet) {
        this.deathTotalNumber.innerHTML = " Total Death/100 : ".concat(Math.trunc(this.country.TotalDeaths * 100000 / this.currentPopulation));
        this.weakTotalNumber.innerHTML = " Total Recovered/100: ".concat(Math.trunc(this.country.TotalRecovered * 100000 / this.currentPopulation), " ");
        this.recoverTotalNumber.innerHTML = " Total Confirmed/100 : ".concat(Math.trunc(this.country.TotalConfirmed * 100000 / this.currentPopulation), " ");
      }

      if (this.isStrictTimeSet && this.isStrictNumberSet) {
        this.deathTotalNumber.innerHTML = " New Death/100 : ".concat(Math.trunc(this.country.NewDeaths * 100000 / this.currentPopulation));
        this.weakTotalNumber.innerHTML = " New Recovered/100: ".concat(Math.trunc(this.country.NewRecovered * 100000 / this.currentPopulation), " ");
        this.recoverTotalNumber.innerHTML = " New Confirmed/100 : ".concat(Math.trunc(this.country.NewConfirmed * 100000 / this.currentPopulation), " ");
      }
    }
  },
  checkState: function checkState() {
    if (this.dayTime.classList.contains("hide")) {
      this.isTotalTimeSet = true;
      this.isStrictTimeSet = false;
    } else {
      this.isTotalTimeSet = false;
      this.isStrictTimeSet = true;
    }

    if (this.strictNumber.classList.contains("hide")) {
      this.isTotalNumberSet = true;
      this.isStrictNumberSet = false;
    } else {
      this.isTotalNumberSet = false;
      this.isStrictNumberSet = true;
    }
  },
  calcPopulation: function calcPopulation() {
    var _this = this;

    if (_appData["default"].CountryCode === "Global") {
      this.currentPopulation = _appData["default"].countriesAPI.reduce(function (acc, elem) {
        return acc + elem.population;
      }, 0);
    } else {
      var country = _appData["default"].countriesAPI.find(function (elem) {
        if (elem.name === _this.country.Country) {
          return elem;
        }

        return false;
      });

      this.currentPopulation = country.population;
    }

    return this.currentPopulation;
  },
  findCountry: function findCountry() {
    if (_appData["default"].CountryCode === "Global") {
      this.country = null;
    } else {
      this.country = _appData["default"].covidAPI.Countries.find(function (element) {
        if (element.CountryCode === _appData["default"].CountryCode) return element;
        return false;
      });
    }

    return this.country;
  }
};
var _default = info;
exports["default"] = _default;