"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valuesOfSortDirection = exports.valuesOfSortBy = exports.sortData = void 0;
var sortData = {
  sortBy: "cases",
  sortDirection: "down",
  "new": false,
  to100k: false,
  max: null
};
exports.sortData = sortData;
var valuesOfSortBy = {
  cases: "TotalConfirmed",
  deaths: "TotalDeaths",
  recovered: "TotalRecovered"
};
exports.valuesOfSortBy = valuesOfSortBy;
var valuesOfSortDirection = {
  up: "expand_less",
  down: "expand_more"
};
exports.valuesOfSortDirection = valuesOfSortDirection;