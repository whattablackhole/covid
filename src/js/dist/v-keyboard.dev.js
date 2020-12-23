"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _appData = _interopRequireDefault(require("./app.data.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var textarea = document.querySelector(".use-keyboard-input");
var LineBreak = {
  eng: ["backspace", "p", "l", "m"]
};
var keyLayout = {
  eng: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m", "done", "space"]
};
var Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },
  eventHandlers: {
    oninput: null,
    onclose: null
  },
  properties: {
    value: [],
    lang: "eng"
  },
  init: function init() {
    var _this = this;

    // Setup main elements
    if (document.querySelector(".keyboard")) {
      document.querySelector(".keyboard__keys").remove();
    } else {
      this.elements.main = document.createElement("div");
      this.elements.main.classList.add("keyboard", "keyboard--hidden", "glass");
    }

    this.elements.keysContainer = document.createElement("div");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this.createKeys());
    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key"); // Add to DOM

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main); // Automatically use keyboard for elements with .use-keyboard-button

    document.querySelectorAll(".use-keyboard-button").forEach(function (element) {
      element.addEventListener("click", function () {
        if (!_appData["default"].keyboard) {
          _this.open(element);
        } else {
          _this.close(element);
        }
      });
    });
  },
  createKeys: function createKeys() {
    var _this2 = this;

    var fragment = document.createDocumentFragment(); // Creates HTML for an icon

    var createIconHTML = function createIconHTML(iconName) {
      return "<i class=\"material-icons\">".concat(iconName, "</i>");
    };

    keyLayout[this.properties.lang].forEach(function (key) {
      var keyElement = document.createElement("button");
      var insertLineBreak = LineBreak[_this2.properties.lang].indexOf(key) !== -1; // Add attributes/classes

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide", "Backspace");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.addEventListener("click", function () {
            _this2["delete"]();
          });
          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide", "Space");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.addEventListener("click", function () {
            _this2.enterSymbol(" ");
          });
          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("keyboard_hide");
          keyElement.addEventListener("click", function () {
            var button = document.querySelector(".use-keyboard-button");

            _this2.close(button);
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener("click", function () {
            _this2.enterSymbol(key);
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  },
  open: function open(element) {
    var button = element;
    this.elements.main.classList.remove("keyboard--hidden");
    _appData["default"].keyboard = true;
    button.childNodes[0].innerHTML = "keyboard_hide";
  },
  "delete": function _delete() {
    textarea.value = textarea.value.slice(0, -1);
    this.inputEventDispatch();
  },
  enterSymbol: function enterSymbol(text) {
    textarea.value += text;
    this.inputEventDispatch();
  },
  close: function close(element) {
    var button = element;
    this.elements.main.classList.add("keyboard--hidden");
    _appData["default"].keyboard = false;
    button.childNodes[0].innerHTML = "keyboard";
  },
  inputEventDispatch: function inputEventDispatch() {
    var event = new Event("input");
    var input = document.querySelector(".countries__input");
    input.dispatchEvent(event);
  }
};
var _default = Keyboard;
exports["default"] = _default;