import APIBehavior from "./API.behavior.js";
import appData from "./app.data.js";
import countriesListBehavior from "./countries-list.behavior.js";
import { valuesOfSortBy, sortData } from "./sort.data.js";
import mapData from "./map.data.js";
import mapBehavior from "./map.behavior.js";

const countriesList = {
  async create() {
    const countries = appData.countriesAPI;
    let totalData = [];
    const ul = document.querySelector(".countries__list");
    countries.forEach((country) => {
      totalData = APIBehavior.getCountryData(country.alpha2Code);
      if (!totalData) return;
      const li = document.createElement("li");
      const countryContainer = document.createElement("button");
      const data = document.createElement("span");
      const flag = document.createElement("span");
      const name = document.createElement("span");

      countryContainer.classList.add("countries__item");
      data.classList.add("countries__data");
      flag.classList.add("countries__flag");
      name.classList.add("countries__country-name");

      data.setAttribute("data-cases", totalData.TotalConfirmed);
      data.setAttribute("data-deaths", totalData.TotalDeaths);
      data.setAttribute("data-recovered", totalData.TotalRecovered);
      data.setAttribute("data-new-cases", totalData.NewConfirmed);
      data.setAttribute("data-new-deaths", totalData.NewDeaths);
      data.setAttribute("data-new-recovered", totalData.NewRecovered);
      data.setAttribute("data-population", totalData.population);
      data.setAttribute("data-latlng", country.latlng);
      data.setAttribute("data-name", country.name);
      data.innerHTML = totalData[valuesOfSortBy[sortData.sortBy]];

      flag.style.backgroundImage = `url(${country.flag})`;
      name.innerHTML = country.name;

      countryContainer.append(data, flag, name);
      this.addClickListener(
        countryContainer,
        country.alpha2Code,
        country.latlng
      );
      li.append(countryContainer);
      ul.append(li);
    });

    const defaultCountryButton = document.querySelector(
      ".countries__default-button"
    );
    this.addClickListener(defaultCountryButton, "Global");
    this.addListenerFilters();
  },
  addClickListener(button, countryCode) {
    button.addEventListener("click", () => {
      countriesListBehavior.choseCountry(countryCode);
    });
  },
  changeValues() {
    const list = document.querySelectorAll(".countries__list li");
    const typeOfValues = sortData.sortBy;
    const isByNew = sortData.new;
    const isBy100k = sortData.to100k;
    list.forEach((element) => {
      const spanElement = element.childNodes[0].childNodes[0];
      const population = element.childNodes[0].childNodes[0].getAttribute(
        "data-population"
      );
      let value = spanElement.dataset[typeOfValues];
      if (isByNew) value = spanElement.getAttribute(`data-new-${typeOfValues}`);
      if (isBy100k) value = Math.floor((value * 100000) / population);
      spanElement.innerHTML = `${value}`;
    });
  },
  addListenerFilters() {
    const buttonSwitchTo100k = document.querySelector(
      ".countries__switch-to100k"
    );
    const buttonSwitchToNew = document.querySelector(
      ".countries__switch-toNew"
    );
    buttonSwitchToNew.addEventListener("click", () => {
      buttonSwitchToNew.innerHTML = mapData.onlyNew
        ? "за последний день"
        : "за весь период";
      sortData.new = !sortData.new;
      this.changeValues();
      if (appData.fullScreenZone !== "countries") return;
      mapBehavior.onButtonClickSimulation("toNew", "countries");
    });
    buttonSwitchTo100k.addEventListener("click", () => {
      buttonSwitchTo100k.innerHTML = mapData.onlyTo100k
        ? "за 100 тыс"
        : "в абсолютных величинах";
      sortData.to100k = !sortData.to100k;
      this.changeValues();
      if (appData.fullScreenZone !== "countries") return;
      mapBehavior.onButtonClickSimulation("to100k", "countries");
    });
  },
};

export default countriesList;
