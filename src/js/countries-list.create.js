import APIBehavior from "./API.behavior.js";
import appData from "./app.data.js";
import countriesListBehavior from "./countries-list.behavior.js";
import { valuesOfSortBy, sortData } from "./sort.data.js";

const countriesList = {
  async create() {
    const countries = appData.countriesAPI;
    let totalData = [];
    const ul = document.querySelector(".countries__list");
    countries.forEach((country) => {
      totalData = APIBehavior.getTotalCasesDeathsRecovered(country.alpha2Code);
      if (totalData[0] == null) return;
      const li = document.createElement("li");
      const countryContainer = document.createElement("button");
      const data = document.createElement("span");
      const flag = document.createElement("span");
      const name = document.createElement("span");

      countryContainer.classList.add("countries__item");
      data.classList.add("countries__data");
      flag.classList.add("countries__flag");
      name.classList.add("countries__country-name");

      data.setAttribute("data-cases", totalData[0]);
      data.setAttribute("data-deaths", totalData[1]);
      data.setAttribute("data-recovered", totalData[2]);
      data.innerHTML = totalData[valuesOfSortBy[sortData.sortBy]];

      flag.style.backgroundImage = `url(${country.flag})`;
      name.innerHTML = country.name;

      countryContainer.append(data, flag, name);
      this.addClickListener(countryContainer, country.alpha2Code);
      li.append(countryContainer);
      ul.append(li);
    });
  },
  addClickListener(button, countryCode) {
    button.addEventListener("click", () => {
      countriesListBehavior.choseCountry(countryCode);
    });
  },
  changeValues() {
    const list = document.querySelectorAll(".countries__list li");
    const typeOfValues = sortData.sortBy;
    list.forEach((element) => {
      const spanElement = element.childNodes[0].childNodes[0];
      const value = element.childNodes[0].childNodes[0].dataset[typeOfValues];

      spanElement.innerHTML = `${value}`;
    });
  },
};

export default countriesList;
