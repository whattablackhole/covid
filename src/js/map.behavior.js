/* eslint-disable */

import { sortData } from "./sort.data.js";
import mapData from "./map.data.js";

const mapBehavior = {
  changePopupText() {
    const { sortBy } = sortData;
    let attrName = "";
    const popups = document.querySelectorAll(".map-marker");
    if (mapData.onlyNew) {
      attrName = `data-new-${sortBy}`;
    } else {
      attrName = `data-${sortBy}`;
    }
    const toSort = [];
    popups.forEach((popup) => {
      let data = popup.getAttribute(attrName);
      if (mapData.onlyTo100k) {
        const population = popup.getAttribute("data-population");
        data = Math.floor((data * 100000) / population);
      }
      popup.innerHTML = `${sortBy}: ${data}`;
      toSort.push(data);
    });
    const max = toSort.sort((a, b) => b - a)[0];
    sortData.max = max;
    this.changeDotColor();
    this.updateLegend();
  },
  changeDotColor() {
    const popups = document.querySelectorAll(".icon-marker");
    const { max } = sortData;

    popups.forEach((popup) => {
      const val = popup.childNodes[0].childNodes[1].childNodes[0].innerHTML.split(
        ": "
      )[1];
      const color = this.getColor(val, max);
      popup.style.backgroundColor = color;
    });
  },
  getColor(d, max) {
    const { sortBy } = sortData;
    const isRecovered = sortBy === "recovered";
    let color = "";
    if (d > max * 0.9) {
      isRecovered ? (color = "#6df202") : (color = "#c40000");
    } else if (d > max * 0.8) {
      isRecovered ? (color = "#8bf002") : (color = "#d86a00");
    } else if (d > max * 0.7) {
      isRecovered ? (color = "#aaee01") : (color = "#df9000");
    } else if (d > max * 0.6) {
      isRecovered ? (color = "#c7ec01") : (color = "#e6b600");
    } else if (d > max * 0.5) {
      isRecovered ? (color = "#f0e900") : (color = "#eacc00");
    } else if (d > max * 0.4) {
      isRecovered ? (color = "#eacc00") : (color = "#f0e900");
    } else if (d > max * 0.3) {
      isRecovered ? (color = "#e6b600") : (color = "#c7ec01");
    } else if (d > max * 0.2) {
      isRecovered ? (color = "#df9000") : (color = "#aaee01");
    } else if (d > max * 0.1) {
      isRecovered ? (color = "#d86a00") : (color = "#8bf002");
    } else if (d >= 0) {
      isRecovered ? (color = "#c40000") : (color = "#6df202");
    }
    return color;
  },
  updateLegend() {
    const values = document.querySelectorAll(".info span");
    const colors = document.querySelectorAll(".info i");
    const { max, sortBy } = sortData;
    const isRecovered = sortBy === "recovered";
    let text = "";
    const grades = [
      0,
      max * 0.1,
      max * 0.2,
      max * 0.3,
      max * 0.4,
      max * 0.5,
      max * 0.6,
      max * 0.7,
      max * 0.8,
      max * 0.9,
    ];
    values.forEach((value, index) => {
      if (isRecovered) {
        text = ` >= ${Math.floor(grades[grades.length - 1 - index])}`;
      } else {
        text = ` >= ${Math.floor(grades[index])}`;
      }

      value.innerHTML = text;
    });
    colors.forEach((color, i) => {
      if (isRecovered) {
        color.style.background = this.getColor(
          grades[grades.length - 1 - i] + 1,
          max
        );
      } else {
        color.style.background = this.getColor(grades[i] + 1, max);
      }
    });
  },
};

export default mapBehavior;
