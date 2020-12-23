"use strict";

var _APIBehavior = _interopRequireDefault(require("./js/API.behavior.js"));

var _info = _interopRequireDefault(require("./js/info.js"));

var _graph = _interopRequireDefault(require("./js/graph.js"));

var _countriesListCreate = _interopRequireDefault(require("./js/countries-list.create.js"));

var _searchBehavior = _interopRequireDefault(require("./js/search.behavior.js"));

var _sortCreate = _interopRequireDefault(require("./js/sort.create.js"));

var _mapCreate = _interopRequireDefault(require("./js/map.create.js"));

var _appBehavior = _interopRequireDefault(require("./js/app.behavior.js"));

require("./css/main.css");

require("./css/reset.css");

require("./css/info.scss");

require("./css/graph.scss");

require("./css/search.css");

require("./css/sort.css");

require("./css/countries-list.css");

require("./css/map.css");

require("./css/fullscreenButton.css");

require("./css/fullscreen.css");

require("./css/buttons.scss");

require("./css/scrollbar.css");

require("./css/footer.css");

require("./css/v-keyboard.css");

var _appData = _interopRequireDefault(require("./js/app.data.js"));

var _vKeyboard2 = _interopRequireDefault(require("./js/v-keyboard.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_APIBehavior["default"].getData());

        case 2:
          console.log(_appData["default"].globalStats);
          console.log(_appData["default"].countryStats);

          _info["default"].initEvents();

          _graph["default"].updateInfo();

          _countriesListCreate["default"].create();

          _searchBehavior["default"].addOnChangeListener();

          _sortCreate["default"].create();

          _mapCreate["default"].create();

          _appBehavior["default"].addMouseoverListeners();

          _appBehavior["default"].addFullscreenClick();

          _vKeyboard2["default"].init();

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
})();