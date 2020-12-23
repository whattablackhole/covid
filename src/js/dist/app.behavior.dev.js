"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appData = _interopRequireDefault(require("./app.data.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var appBehavior = {
  addMouseoverListeners: function addMouseoverListeners() {
    var dives = document.querySelector(".app-container").childNodes;
    dives = Object.values(dives).slice(0, -1);
    dives.forEach(function (div) {
      div.addEventListener("mouseover", function () {
        var fullscreenButton = div.childNodes[0];
        fullscreenButton.style.opacity = 1;
      });
      div.addEventListener("mouseleave", function () {
        var fullscreenButton = div.childNodes[0];
        fullscreenButton.style.opacity = 0;
      });
    });
  },
  addFullscreenClick: function addFullscreenClick() {
    var buttons = document.querySelectorAll(".fullScreen__button");
    buttons = Object.values(buttons);
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        button.parentElement.parentElement.classList.toggle("fullscreen");
        button.parentElement.parentElement.scrollIntoView();

        if (button.parentElement.parentElement.classList.contains("fullscreen")) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }

        var mapSwitches = document.querySelector(".map__switches");
        var countriesSwitches = document.querySelector(".countries__switchers"); // const graphToggle = document.querySelector(".graph-toggle.toggle-menu");

        mapSwitches.classList.toggle("hide");
        countriesSwitches.classList.toggle("hide"); // graphToggle.classList.toggle("hide");

        var zone = button.parentElement.parentElement.classList[0];
        var currentAppZone = _appData["default"].fullScreenZone;

        if (!currentAppZone) {
          _appData["default"].fullScreenZone = zone;
        } else if (_appData["default"].fullScreenZone === zone) {
          _appData["default"].fullScreenZone = undefined;
        }

        var body = document.querySelector("body");
        body.classList.toggle("overflow");
      });
    });
  }
};
var _default = appBehavior;
exports["default"] = _default;