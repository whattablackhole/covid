"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sortData = require("./sort.data.js");

var sortBehavior = {
  sort: function sort() {
    var toSort = document.querySelectorAll(".countries__list li");
    toSort = Array.prototype.slice.call(toSort, 0);
    toSort.sort(function (a, b) {
      var aVal = a.childNodes[0].childNodes[0].innerHTML;
      var bVal = b.childNodes[0].childNodes[0].innerHTML;

      if (_sortData.sortData.sortDirection === "up") {
        return aVal - bVal;
      }

      return bVal - aVal;
    });
    _sortData.sortData.max = toSort[0].childNodes[0].childNodes[0].innerHTML;
    var parent = document.querySelector(".countries__list");
    parent.innerHTML = "";
    toSort.forEach(function (item) {
      parent.append(item);
    });
  }
};
var _default = sortBehavior;
exports["default"] = _default;