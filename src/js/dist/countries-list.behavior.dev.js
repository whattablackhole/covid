"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appData = _interopRequireDefault(require("./app.data.js"));

var _graph = _interopRequireDefault(require("./graph.js"));

var _info = _interopRequireDefault(require("./info.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var countriesListBehavior = {
  choseCountry: function choseCountry(countryCode) {
    _appData["default"].CountryCode = countryCode;

    _graph["default"].updateInfo();

    _info["default"].updateInfo();
  }
};
var _default = countriesListBehavior;
exports["default"] = _default;