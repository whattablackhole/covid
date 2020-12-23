"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mapBehavior = _interopRequireDefault(require("./map.behavior.js"));

var _sortData = require("./sort.data.js");

var _mapData = _interopRequireDefault(require("./map.data.js"));

var _appData = _interopRequireDefault(require("./app.data.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var map = {
  create: function create() {
    var mapOptions = {
      center: [20, 50],
      zoom: 2,
      maxZoom: 6,
      minZoom: 1,
      noWrap: true
    };
    var mapContainer = new L.Map("map", mapOptions);
    var layer = new L.TileLayer("https://api.mapbox.com/styles/v1/neiroromo/ckitmzql301wm19o29p4b066i/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmVpcm9yb21vIiwiYSI6ImNraXRtemxlMjBxNnYyd21tNjM1aThkZ3YifQ.51aEuxph6DwbOeR9eA0TMg");
    mapContainer.addLayer(layer);
    this.addMarkers(mapContainer);
    this.addLegend(mapContainer);
    this.addControls(mapContainer);

    _mapBehavior["default"].changePopupText();
  },
  addMarkers: function addMarkers(mapContainer) {
    var countries = document.querySelectorAll(".countries__data");
    countries.forEach(function (country) {
      var iconMarker = document.createElement("span");
      var iconMarkerTooltip = document.createElement("span");
      var h2 = document.createElement("h2");
      var ul = document.createElement("ul");
      var li = document.createElement("li");
      var container = document.createElement("div");
      iconMarker.classList.add("icon-marker");
      iconMarkerTooltip.classList.add("icon-marker-tooltip");
      li.classList.add("map-marker");
      container.classList.add("icon");

      var attributes = _toConsumableArray(country.attributes);

      attributes.shift();
      attributes.forEach(function (attr) {
        li.setAttribute(attr.nodeName, attr.nodeValue);
      });
      h2.innerHTML = li.getAttribute("data-name");
      li.innerHTML = "".concat(li.getAttribute("data-cases"));
      ul.append(li);
      iconMarkerTooltip.append(h2, ul);
      iconMarker.append(iconMarkerTooltip);
      container.append(iconMarker);
      var latlng = li.getAttribute("data-latlng").split(",");
      var html = container.innerHTML;
      var marker = new L.Marker(latlng, {
        icon: L.divIcon({
          className: "icon",
          html: html
        }),
        riseOnHover: true
      });
      marker.addTo(mapContainer);
    });
  },
  addLegend: function addLegend(mapContainer) {
    var legend = L.control({
      position: "bottomright"
    });

    legend.onAdd = function () {
      var div = L.DomUtil.create("div", "map__info map__legend");
      var max = _sortData.sortData.max;
      var grades = [0, max * 0.0000001, max * 0.000001, max * 0.00001, max * 0.0001, max * 0.001, max * 0.01, max * 0.2, max * 0.5, max * 0.9];

      for (var i = 0; i < grades.length; i += 1) {
        div.innerHTML += "<i style=\"background: ".concat(_mapBehavior["default"].getColor(grades[i] + 1, max), "\"></i><span>> ").concat(Math.floor(grades[i]), "</span>");
      }

      return div;
    };

    legend.addTo(mapContainer);
  },
  addControls: function addControls(mapContainer) {
    var control = L.control({
      position: "bottomright"
    });
    var container = document.createElement("div");
    var buttonSwitchToNew = document.createElement("button");
    var buttonSwitchTo100k = document.createElement("button");
    var buttonSortBy = document.createElement("button");
    buttonSwitchToNew.classList.add("map__switch-toNew");
    buttonSwitchTo100k.classList.add("map__switch-to100k");
    buttonSortBy.classList.add("map__switch-sortBy");
    container.classList.add("map__switches", "hide");
    buttonSwitchToNew.innerHTML = _mapData["default"].onlyNew ? "за последний день" : "за весь период";
    buttonSwitchTo100k.innerHTML = _mapData["default"].onlyTo100k ? "за 100 тыс" : "в абсолютных величинах";
    buttonSortBy.innerHTML = _sortData.sortData.sortBy;
    container.append(buttonSortBy, buttonSwitchToNew, buttonSwitchTo100k);

    control.onAdd = function () {
      return container;
    };

    buttonSwitchToNew.addEventListener("click", function () {
      _mapData["default"].onlyNew = !_mapData["default"].onlyNew;

      _mapBehavior["default"].changePopupText();

      buttonSwitchToNew.innerHTML = _mapData["default"].onlyNew ? "за последний день" : "за весь период";
      if (_appData["default"].fullScreenZone !== "map") return;

      _mapBehavior["default"].onButtonClickSimulation("toNew", "map");
    });
    buttonSwitchTo100k.addEventListener("click", function () {
      _mapData["default"].onlyTo100k = !_mapData["default"].onlyTo100k;

      _mapBehavior["default"].changePopupText();

      buttonSwitchTo100k.innerHTML = _mapData["default"].onlyTo100k ? "за 100 тыс" : "в абсолютных величинах";
      if (_appData["default"].fullScreenZone !== "map") return;

      _mapBehavior["default"].onButtonClickSimulation("to100k", "map");
    });
    buttonSortBy.addEventListener("click", function () {
      if (_appData["default"].fullScreenZone !== "map") return;

      _mapBehavior["default"].onButtonClickSimulation("sortBy", "map");
    });
    control.addTo(mapContainer);
  }
};
var _default = map;
exports["default"] = _default;