"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sortData = require("./sort.data.js");

var _countriesListCreate = _interopRequireDefault(require("./countries-list.create.js"));

var _sortBehavior = _interopRequireDefault(require("./sort.behavior.js"));

var _mapBehavior = _interopRequireDefault(require("./map.behavior.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sort = {
  create: function create() {
    var sortByButton = document.querySelector(".countries__sort-method");
    var sortDirectionButton = document.querySelector(".countries__sort-type");
    this.updateSortByButtonName();
    this.updateSortDirectionButtonIcon();
    this.addClickListener(sortByButton, sortDirectionButton);

    _sortBehavior["default"].sort();
  },
  addClickListener: function addClickListener(sortByButton, sortDirectionButton) {
    var _this = this;

    sortByButton.addEventListener("click", function () {
      _this.changeSortBy();

      _sortBehavior["default"].sort();

      _mapBehavior["default"].changePopupText();
    });
    sortDirectionButton.addEventListener("click", function () {
      _this.changeSortDirection();

      _sortBehavior["default"].sort();
    });
  },
  changeSortBy: function changeSortBy() {
    switch (_sortData.sortData.sortBy) {
      case "cases":
        _sortData.sortData.sortBy = "deaths";
        break;

      case "deaths":
        _sortData.sortData.sortBy = "recovered";
        break;

      case "recovered":
        _sortData.sortData.sortBy = "cases";
        break;

      default:
        break;
    }

    this.updateSortByButtonName();

    _countriesListCreate["default"].changeValues();
  },
  changeSortDirection: function changeSortDirection() {
    switch (_sortData.sortData.sortDirection) {
      case "down":
        _sortData.sortData.sortDirection = "up";
        break;

      case "up":
        _sortData.sortData.sortDirection = "down";
        break;

      default:
        break;
    }

    this.updateSortDirectionButtonIcon();
  },
  updateSortByButtonName: function updateSortByButtonName() {
    var sortByButton = document.querySelector(".countries__sort-method");
    var mapSortByButton = document.querySelector(".map__switch-sortBy");
    sortByButton.innerHTML = _sortData.sortData.sortBy;
    if (mapSortByButton) mapSortByButton.innerHTML = _sortData.sortData.sortBy;
  },
  updateSortDirectionButtonIcon: function updateSortDirectionButtonIcon() {
    var sortDirectionButton = document.querySelector(".countries__sort-type .material-icons");
    sortDirectionButton.innerHTML = _sortData.valuesOfSortDirection[_sortData.sortData.sortDirection];
  }
};
var _default = sort;
exports["default"] = _default;