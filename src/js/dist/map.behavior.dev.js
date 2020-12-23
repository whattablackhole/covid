"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sortData = require("./sort.data.js");

var _mapData = _interopRequireDefault(require("./map.data.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mapBehavior = {
  changePopupText: function changePopupText() {
    var sortBy = _sortData.sortData.sortBy;
    var attrName = "";
    var popups = document.querySelectorAll(".map-marker");

    if (_mapData["default"].onlyNew) {
      attrName = "data-new-".concat(sortBy);
    } else {
      attrName = "data-".concat(sortBy);
    }

    var toSort = [];
    popups.forEach(function (item) {
      var popup = item;
      var data = popup.getAttribute(attrName);

      if (_mapData["default"].onlyTo100k) {
        var population = popup.getAttribute("data-population");
        data = Math.floor(data * 100000 / population);
      }

      popup.innerHTML = "".concat(sortBy, ": ").concat(data);
      toSort.push(data);
    });
    var max = toSort.sort(function (a, b) {
      return b - a;
    })[0];
    _sortData.sortData.max = max;
    this.changeDotColor();
    this.updateLegend();
  },
  changeDotColor: function changeDotColor() {
    var _this = this;

    var popups = document.querySelectorAll(".icon-marker");
    var max = _sortData.sortData.max;
    popups.forEach(function (item) {
      var popup = item;
      var val = popup.childNodes[0].childNodes[1].childNodes[0].innerHTML.split(": ")[1];

      var color = _this.getColor(val, max);

      popup.style.backgroundColor = color;
    });
  },
  getColor: function getColor(d, max) {
    var sortBy = _sortData.sortData.sortBy;
    var isRecovered = sortBy === "recovered";
    var color = "";

    if (d > max * 0.9) {
      color = isRecovered ? "#6df202" : "#c40000";
    } else if (d > max * 0.8) {
      color = isRecovered ? "#8bf002" : "#d86a00";
    } else if (d > max * 0.7) {
      color = isRecovered ? "#aaee01" : "#df9000";
    } else if (d > max * 0.6) {
      color = isRecovered ? "#c7ec01" : "#e6b600";
    } else if (d > max * 0.5) {
      color = isRecovered ? "#f0e900" : "#eacc00";
    } else if (d > max * 0.4) {
      color = isRecovered ? "#eacc00" : "#f0e900";
    } else if (d > max * 0.3) {
      color = isRecovered ? "#e6b600" : "#c7ec01";
    } else if (d > max * 0.2) {
      color = isRecovered ? "#df9000" : "#aaee01";
    } else if (d > max * 0.1) {
      color = isRecovered ? "#d86a00" : "#8bf002";
    } else if (d >= 0) {
      color = isRecovered ? "#c40000" : "#6df202";
    }

    return color;
  },
  updateLegend: function updateLegend() {
    var _this2 = this;

    var values = document.querySelectorAll(".map__info span");
    var colors = document.querySelectorAll(".map__info i");
    var max = _sortData.sortData.max,
        sortBy = _sortData.sortData.sortBy;
    var isRecovered = sortBy === "recovered";
    var text = "";
    var grades = [0, max * 0.1, max * 0.2, max * 0.3, max * 0.4, max * 0.5, max * 0.6, max * 0.7, max * 0.8, max * 0.9];
    values.forEach(function (value, index) {
      if (isRecovered) {
        text = " >= ".concat(Math.floor(grades[grades.length - 1 - index]));
      } else {
        text = " >= ".concat(Math.floor(grades[index]));
      }

      value.innerHTML = text;
    });
    colors.forEach(function (color, i) {
      if (isRecovered) {
        color.style.background = _this2.getColor(grades[grades.length - 1 - i] + 1, max);
      } else {
        color.style.background = _this2.getColor(grades[i] + 1, max);
      }
    });
  },
  onButtonClickSimulation: function onButtonClickSimulation(button, zone) {
    var click = new Event("click");
    var sortByButton = document.querySelector(".countries__sort-method");
    var mapSwitcherToNew = document.querySelector(".map__switch-toNew");
    var infoToNew = document.querySelector(".info-toggle.toggle-one .info-arrow-right"); // const graphToNew = document.querySelector(
    //   ".graph-toggle.toggle-one .graph-arrow-right"
    // );

    var countriesToNew = document.querySelector(".countries__switch-toNew");
    var mapSwitcherTo100k = document.querySelector(".map__switch-to100k");
    var infoTo100k = document.querySelector(".info-toggle.toggle-two .info-arrow-right");
    var countriesTo100k = document.querySelector(".countries__switch-to100k"); // const graphTo100k = document.querySelector(
    //   ".graph-toggle.toggle-two .graph-arrow-right"
    // );

    var toNew = {
      map: mapSwitcherToNew,
      info: infoToNew,
      // graph: graphToNew,
      countries: countriesToNew
    };
    var to100k = {
      map: mapSwitcherTo100k,
      info: infoTo100k,
      // graph: graphTo100k,
      countries: countriesTo100k
    };

    if (button === "toNew") {
      Object.entries(toNew).forEach(function (item) {
        if (item[0] !== zone) {
          item[1].dispatchEvent(click);
        }
      });
    }

    if (button === "to100k") {
      Object.entries(to100k).forEach(function (item) {
        if (item[0] !== zone) item[1].dispatchEvent(click);
      });
    }

    if (button === "sortBy") {
      sortByButton.dispatchEvent(click);
    }
  }
};
var _default = mapBehavior;
exports["default"] = _default;