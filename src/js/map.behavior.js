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
    popups.forEach((item) => {
      const popup = item;
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

    popups.forEach((item) => {
      const popup = item;
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
  updateLegend() {
    const values = document.querySelectorAll(".map__info span");
    const colors = document.querySelectorAll(".map__info i");
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
  onButtonClickSimulation(button, zone) {
    const click = new Event("click");
    const mapSwitcherToNew = document.querySelector(".map__switch-toNew");
    const infoToNew = document.querySelector(
      ".info-toggle.toggle-one .info-arrow-right"
    );
    const graphToNew = document.querySelector(
      ".graph-toggle.toggle-one .graph-arrow-right"
    );
    const mapSwitcherTo100k = document.querySelector(".map__switch-to100k");
    const infoTo100k = document.querySelector(
      ".info-toggle.toggle-two .info-arrow-right"
    );
    const graphTo100k = document.querySelector(
      ".graph-toggle.toggle-two .graph-arrow-right"
    );

    const toNew = {
      map: mapSwitcherToNew,
      info: infoToNew,
      graph: graphToNew,
    };

    const to100k = {
      map: mapSwitcherTo100k,
      info: infoTo100k,
      graph: graphTo100k,
    };

    if (button === "toNew") {
      Object.entries(toNew).forEach((item) => {
        if (item[0] !== zone) {
          item[1].dispatchEvent(click);
        }
      });
    }
    if (button === "to100k") {
      Object.entries(to100k).forEach((item) => {
        if (item[0] !== zone) item[1].dispatchEvent(click);
      });
    }
  },
};

export default mapBehavior;
