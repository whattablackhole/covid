"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var searchBehavior = {
  addOnChangeListener: function addOnChangeListener() {
    var _this = this;

    var input = document.querySelector(".countries__input");
    input.addEventListener("input", function () {
      _this.search(input);
    });
  },
  search: function search(input) {
    var value = input.value.toLowerCase();
    var list = document.querySelectorAll(".countries__list li");
    var regex = new RegExp("".concat(value));
    list.forEach(function (element) {
      var countryInListName = element.childNodes[0].childNodes[2].innerHTML;

      if (regex.test(countryInListName.toLowerCase())) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    });
  }
};
var _default = searchBehavior;
exports["default"] = _default;