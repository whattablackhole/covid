"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appData = _interopRequireDefault(require("./app.data.js"));

var _info = _interopRequireDefault(require("./info.js"));

var _APIBehavior = _interopRequireDefault(require("./API.behavior.js"));

var _chartConfig = _interopRequireDefault(require("./chart.config.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var graph = {
  ctx: document.getElementById("myChart"),
  deathsBtn: document.querySelector("#deaths"),
  recovoredBtn: document.querySelector("#recovored"),
  confirmedBtn: document.querySelector("#confirmed"),
  myChart: null,
  country: null,
  allDates: [],
  allDeaths: [],
  allRecovered: [],
  allConfirms: [],
  isTotalNumberSet: true,
  isStrictNumberSet: false,
  isTotalTimeSet: true,
  isStrictTimeSet: false,
  isListersInited: false,
  currentPopulation: 0,
  divisor: 100000,
  initListeners: function initListeners() {
    if (this.isListersInited === true) {
      return;
    }

    this.isListersInited = true;
    this.deathsBtn.addEventListener("click", this.changeText.bind(this));
    this.recovoredBtn.addEventListener("click", this.changeText.bind(this));
    this.confirmedBtn.addEventListener("click", this.changeText.bind(this));
  },
  changeText: function changeText(e) {
    if (e.target.id === "deaths") {
      this.deathsBtn.checked = true;
      this.recovoredBtn.checked = false;
      this.confirmedBtn.checked = false; // if (appData.fullScreenZone === "graph")
      //   mapBehavior.onButtonClickSimulation("toNew", "graph");
    } else if (e.target.id === "confirmed") {
      this.confirmedBtn.checked = true;
      this.recovoredBtn.checked = false;
      this.deathsBtn.checked = false; // if (appData.fullScreenZone === "graph")
      //   mapBehavior.onButtonClickSimulation("to100k", "graph");
    } else {
      this.recovoredBtn.checked = true;
      this.confirmedBtn.checked = false;
      this.deathsBtn.checked = false; // if (appData.fullScreenZone === "graph")
      //   mapBehavior.onButtonClickSimulation("to100k", "graph");
    }

    console.log("hello");
    this.updateInfo();
  },
  createChart: function createChart() {
    // eslint-disable-next-line
    this.myChart = new Chart(this.ctx, _chartConfig["default"]);
  },
  getCountryDate: function getCountryDate() {
    var _this = this;

    this.allDates = [];
    this.allDeaths = [];
    this.allConfirms = [];
    this.allRecovered = [];

    _appData["default"].countryStats.forEach(function (element) {
      _this.allDates.push(element.Date.slice(0, -10));
    });

    _appData["default"].countryStats.forEach(function (element) {
      if (_info["default"].isStrictNumberSet) _this.allDeaths.push(Math.trunc(element.Deaths * _this.divisor / _info["default"].currentPopulation));else {
        _this.allDeaths.push(element.Deaths);
      }
    });

    _appData["default"].countryStats.forEach(function (element) {
      if (_info["default"].isStrictNumberSet) _this.allConfirms.push(Math.trunc(element.Confirmed * _this.divisor / _info["default"].currentPopulation));else {
        _this.allConfirms.push(element.Confirmed);
      }
    });

    _appData["default"].countryStats.forEach(function (element) {
      if (_info["default"].isStrictNumberSet) _this.allRecovered.push(Math.trunc(element.Recovered * _this.divisor / _info["default"].currentPopulation));else {
        _this.allRecovered.push(element.Recovered);
      }
    });
  },
  dividePopulation: function dividePopulation() {
    if (this.isStrictTimeSet && this.isStrictNumberSet) {
      return [Math.trunc(_appData["default"].covidAPI.Global.NewDeaths * this.divisor), Math.trunc(_appData["default"].covidAPI.Global.NewRecovered * this.divisor / this.currentPopulation), Math.trunc(_appData["default"].covidAPI.Global.NewConfirmed * this.divisor / this.currentPopulation)];
    }

    return [Math.trunc(_appData["default"].covidAPI.Global.TotalDeaths * this.divisor / this.currentPopulation), Math.trunc(_appData["default"].covidAPI.Global.TotalRecovered * this.divisor / this.currentPopulation), Math.trunc(_appData["default"].covidAPI.Global.TotalConfirmed * this.divisor / this.currentPopulation)];
  },
  updateInfo: function updateInfo() {
    return regeneratorRuntime.async(function updateInfo$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (this.myChart !== null) {
              this.myChart.destroy();
            }

            this.initListeners();
            this.findCountry();

            _info["default"].checkState();

            this.calcPopulation();

            if (!(_appData["default"].CountryCode === "Global")) {
              _context.next = 16;
              break;
            }

            document.querySelector(".graph-wrapper").classList.add("hide");
            _chartConfig["default"].data.datasets[0].label = "Global";
            _chartConfig["default"].type = "bar";
            this.createChart();

            if (_info["default"].isTotalTimeSet && _info["default"].isTotalNumberSet) {
              this.myChart.data.labels = ["Total Deaths", "Total Recovered", "Total Confirms"];
              this.myChart.data.datasets[0].data = [_appData["default"].covidAPI.Global.TotalDeaths, _appData["default"].covidAPI.Global.TotalRecovered, _appData["default"].covidAPI.Global.TotalConfirmed];
              this.myChart.update();
            }

            if (_info["default"].isStrictTimeSet && _info["default"].isTotalNumberSet) {
              this.myChart.data.labels = ["New Deaths", "New Recovered", "New Confirms"];
              this.myChart.data.datasets[0].data = [_appData["default"].covidAPI.Global.NewDeaths, _appData["default"].covidAPI.Global.NewRecovered, _appData["default"].covidAPI.Global.NewConfirmed];
              this.myChart.update();
            }

            if (_info["default"].isTotalTimeSet && _info["default"].isStrictNumberSet) {
              this.myChart.data.labels = ["Total Death/100T", "Total Recovered/100T", "Total Confirmed/100T"];
              this.myChart.data.datasets[0].data = this.dividePopulation();
              this.myChart.update();
            }

            if (_info["default"].isStrictTimeSet && _info["default"].isStrictNumberSet) {
              this.myChart.data.labels = ["New Death/100T", "New Recovered/100T", "New Confirmed/100T"];
              this.myChart.data.datasets[0].data = [Math.trunc(_appData["default"].covidAPI.Global.NewDeaths * this.divisor / _info["default"].currentPopulation), Math.trunc(_appData["default"].covidAPI.Global.NewRecovered * this.divisor / _info["default"].currentPopulation), Math.trunc(_appData["default"].covidAPI.Global.NewConfirmed * this.divisor / _info["default"].currentPopulation)];
              this.myChart.update();
            }

            _context.next = 26;
            break;

          case 16:
            document.querySelector(".graph-wrapper").classList.remove("hide");
            _chartConfig["default"].data.datasets[0].label = "".concat(this.country.Country);
            _chartConfig["default"].type = "line";
            this.myChart.destroy();
            this.createChart();
            _context.next = 23;
            return regeneratorRuntime.awrap(_APIBehavior["default"].getGlobalFrom(this.country.Country));

          case 23:
            console.log(_appData["default"].countryStats);
            this.getCountryDate();

            if (_info["default"].isStrictTimeSet) {
              if (this.myChart !== null) {
                this.myChart.destroy();
              }

              _chartConfig["default"].type = "bar";
              this.createChart();

              if (_info["default"].isTotalNumberSet) {
                this.myChart.data.labels = ["New Deaths", "New Recovered", "New Confirmed"];
                this.myChart.data.datasets[0].data = [_info["default"].country.NewDeaths, _info["default"].country.NewRecovered, _info["default"].country.NewConfirmed];
                this.myChart.update();
              } else {
                this.myChart.data.labels = ["New Deaths/100T", "New Recovered/100T", "New Confirmed/100T"];
                this.myChart.data.datasets[0].data = [Math.trunc(_info["default"].country.NewDeaths * this.divisor / _info["default"].currentPopulation), Math.trunc(_info["default"].country.NewRecovered * this.divisor / _info["default"].currentPopulation), Math.trunc(_info["default"].country.NewConfirmed * this.divisor / _info["default"].currentPopulation)];
                this.myChart.update();
              }
            } else {
              if (this.deathsBtn.checked === true) {
                this.myChart.data.labels = this.allDates;
                this.myChart.data.datasets[0].data = _toConsumableArray(this.allDeaths);
              }

              if (this.confirmedBtn.checked === true) {
                this.myChart.data.labels = this.allDates;
                this.myChart.data.datasets[0].data = _toConsumableArray(this.allConfirms);
              }

              if (this.recovoredBtn.checked === true) {
                console.log("a");
                console.log(this.allRecovered);
                this.myChart.data.labels = this.allDates;
                this.myChart.data.datasets[0].data = _toConsumableArray(this.allRecovered);
              }

              this.myChart.update();
            }

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  calcPopulation: function calcPopulation() {
    var _this2 = this;

    if (_appData["default"].CountryCode === "Global") {
      this.currentPopulation = _appData["default"].countriesAPI.reduce(function (acc, elem) {
        return acc + elem.population;
      }, 0);
    } else {
      var country = _appData["default"].countriesAPI.find(function (elem) {
        if (elem.name === _this2.country.Country) {
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
var _default = graph;
exports["default"] = _default;