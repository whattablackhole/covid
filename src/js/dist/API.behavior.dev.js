"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appData = _interopRequireDefault(require("./app.data.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var APIBehavior = {
  getData: function getData() {
    return regeneratorRuntime.async(function getData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(this.checkSavedData());

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, null, this);
  },
  dataFetch: function dataFetch(src) {
    return regeneratorRuntime.async(function dataFetch$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", fetch("".concat(src)).then(function (response) {
              return response.json();
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  // async getCountryDate(countryName) {
  //   const date = new Date();
  //   const today = date.toISOString().slice(0, 10);
  //   const name = countryName;
  //   const date2 = new Date();
  //   date2.setDate(date2.getDate() - 2);
  //   const yesterday = date2.toISOString().slice(0, 10);
  //   const req = `https://api.covid19api.com/country/${name}?from=${yesterday}T00:00:00Z&to=${today}T00:00:00Z;`;
  //   const country = await this.dataFetch(req);
  //   appData.country = {
  //     ...country,
  //   };
  // },
  getGlobalFrom: function getGlobalFrom(countryName) {
    var request, country, date, requestTwo, global;
    return regeneratorRuntime.async(function getGlobalFrom$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            request = "https://api.covid19api.com/country/".concat(countryName);
            _context3.next = 3;
            return regeneratorRuntime.awrap(this.dataFetch(request));

          case 3:
            country = _context3.sent;
            date = country[0].Date;
            requestTwo = "https://api.covid19api.com/world?from=".concat(date);
            _context3.next = 8;
            return regeneratorRuntime.awrap(this.dataFetch(requestTwo));

          case 8:
            global = _context3.sent;
            _appData["default"].globalStats = _objectSpread({}, global);
            _appData["default"].countryStats = _toConsumableArray(country);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, this);
  },
  getCountryData: function getCountryData(CountryCode) {
    var countriesCovidAPI = _appData["default"].covidAPI.Countries;
    var countriesCountriesAPI = _appData["default"].countriesAPI;
    var countryCovidAPI = countriesCovidAPI.find(function (elem) {
      return elem.CountryCode === CountryCode;
    });
    var countryCountriesAPI = countriesCountriesAPI.find(function (elem) {
      return elem.alpha2Code === CountryCode;
    });
    if (!countryCovidAPI) return undefined;
    var TotalConfirmed = countryCovidAPI.TotalConfirmed,
        TotalDeaths = countryCovidAPI.TotalDeaths,
        TotalRecovered = countryCovidAPI.TotalRecovered,
        NewConfirmed = countryCovidAPI.NewConfirmed,
        NewDeaths = countryCovidAPI.NewDeaths,
        NewRecovered = countryCovidAPI.NewRecovered;
    var population = countryCountriesAPI.population;
    return {
      TotalConfirmed: TotalConfirmed,
      TotalDeaths: TotalDeaths,
      TotalRecovered: TotalRecovered,
      NewConfirmed: NewConfirmed,
      NewDeaths: NewDeaths,
      NewRecovered: NewRecovered,
      population: population
    };
  },
  checkSavedData: function checkSavedData() {
    var currentDate, lastUpdateDate, updateDOM;
    return regeneratorRuntime.async(function checkSavedData$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(localStorage.covidAPI && localStorage.countriesAPI)) {
              _context4.next = 12;
              break;
            }

            currentDate = new Date().toISOString().slice(0, 10);
            lastUpdateDate = JSON.parse(localStorage.covidAPI).Date.slice(0, 10);

            if (!(lastUpdateDate !== currentDate)) {
              _context4.next = 6;
              break;
            }

            _context4.next = 6;
            return regeneratorRuntime.awrap(this.updateAPI());

          case 6:
            updateDOM = document.querySelector(".countries__last-update span");
            updateDOM.innerHTML = "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435: ".concat(lastUpdateDate);
            _appData["default"].covidAPI = JSON.parse(localStorage.covidAPI);
            _appData["default"].countriesAPI = JSON.parse(localStorage.countriesAPI);
            _context4.next = 14;
            break;

          case 12:
            _context4.next = 14;
            return regeneratorRuntime.awrap(this.updateAPI());

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, null, this);
  },
  updateAPI: function updateAPI() {
    var countriesAPISource, covidAPISource, covid, countries, updateDOM, lastUpdateDate;
    return regeneratorRuntime.async(function updateAPI$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            countriesAPISource = "https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code;latlng";
            covidAPISource = "https://api.covid19api.com/summary";
            _context5.next = 4;
            return regeneratorRuntime.awrap(this.dataFetch(covidAPISource));

          case 4:
            covid = _context5.sent;
            _context5.next = 7;
            return regeneratorRuntime.awrap(this.dataFetch(countriesAPISource));

          case 7:
            countries = _context5.sent;

            if (!(covid.Message === "Caching in progress")) {
              _context5.next = 11;
              break;
            }

            alert("Updating data.");
            return _context5.abrupt("return");

          case 11:
            localStorage.covidAPI = JSON.stringify(covid);
            localStorage.countriesAPI = JSON.stringify(countries);
            _appData["default"].covidAPI = _objectSpread({}, covid);
            _appData["default"].countriesAPI = _toConsumableArray(countries);
            updateDOM = document.querySelector(".countries__last-update span");
            lastUpdateDate = JSON.parse(localStorage.covidAPI).Date.slice(0, 10);
            updateDOM.innerHTML = "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435: ".concat(lastUpdateDate);

          case 18:
          case "end":
            return _context5.stop();
        }
      }
    }, null, this);
  }
};
var _default = APIBehavior;
exports["default"] = _default;