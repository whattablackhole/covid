import appData from "./app.data.js";
import mapBehavior from "./map.behavior.js";

const info = {
  leftArrow: document.querySelector(".info-arrow-left"),
  rightArrow: document.querySelector(".info-arrow-right"),
  deathTotalNumber: document.querySelector(".info-death"),
  weakTotalNumber: document.querySelector(".info-weak"),
  recoverTotalNumber: document.querySelector(".info-recover"),
  dayTime: document.querySelector(".info-day-time"),
  totalTime: document.querySelector(".info-whole-time"),
  toggleTwo: document.querySelector(".toggle-two"),
  strictNumber: document.querySelector(".info-strict-number"),
  totalNumber: document.querySelector(".info-total-number"),
  countryName: document.querySelector(".info-country"),
  country: null,
  isTotalNumberSet: true,
  isStrictNumberSet: false,
  isTotalTimeSet: true,
  isStrictTimeSet: false,
  currentPopulation: null,
  async initEvents() {
    this.updateInfo();
    this.rightArrow.addEventListener("click", this.changeText.bind(this));
    this.leftArrow.addEventListener("click", this.changeText.bind(this));
    this.toggleTwo
      .querySelector(".info-arrow-left")
      .addEventListener("click", this.changeText.bind(this));
    this.toggleTwo
      .querySelector(".info-arrow-right")
      .addEventListener("click", this.changeText.bind(this));
  },
  changeText(e) {
    console.log("hel");
    if (e.target.parentElement.classList.contains("toggle-one")) {
      this.dayTime.classList.toggle("hide");
      this.totalTime.classList.toggle("hide");
      if (
        appData.fullScreenZone === undefined ||
        appData.fullScreenZone === "info"
      )
        mapBehavior.onButtonClickSimulation("toNew", "info");
    } else {
      this.totalNumber.classList.toggle("hide");
      this.strictNumber.classList.toggle("hide");
      if (
        appData.fullScreenZone === undefined ||
        appData.fullScreenZone === "info"
      )
        mapBehavior.onButtonClickSimulation("to100k", "info");
    }
    console.log("hello");
    this.updateInfo();
  },
  updateInfo() {
    this.checkState();
    this.findCountry();
    this.calcPopulation();
    if (appData.CountryCode === "Global") {
      this.countryName.textContent = "Global";
      if (this.isTotalTimeSet && this.isTotalNumberSet) {
        this.deathTotalNumber.innerHTML = `Total Deaths : ${appData.covidAPI.Global.TotalDeaths} `;
        this.weakTotalNumber.innerHTML = ` Total Recovered : ${appData.covidAPI.Global.TotalRecovered} `;
        this.recoverTotalNumber.innerHTML = ` Total Confirmed : ${appData.covidAPI.Global.TotalConfirmed} `;
      }
      if (this.isStrictTimeSet && this.isTotalNumberSet) {
        this.deathTotalNumber.innerHTML = ` New Deaths : ${appData.covidAPI.Global.NewDeaths} `;
        this.weakTotalNumber.innerHTML = ` New Recovered : ${appData.covidAPI.Global.NewRecovered} `;
        this.recoverTotalNumber.innerHTML = ` New Confirmed : ${appData.covidAPI.Global.NewConfirmed} `;
      }
      if (this.isTotalTimeSet && this.isStrictNumberSet) {
        this.deathTotalNumber.innerHTML = ` Total Death/100 : ${Math.trunc(
          (appData.covidAPI.Global.TotalDeaths * 100000) /
            this.currentPopulation
        )}`;
        this.weakTotalNumber.innerHTML = ` Total Recovered/100: ${Math.trunc(
          (appData.covidAPI.Global.TotalRecovered * 100000) /
            this.currentPopulation
        )} `;
        this.recoverTotalNumber.innerHTML = ` Total Confirmed/100 : ${Math.trunc(
          (appData.covidAPI.Global.TotalConfirmed * 100000) /
            this.currentPopulation
        )} `;
      }
      if (this.isStrictTimeSet && this.isStrictNumberSet) {
        this.deathTotalNumber.innerHTML = ` New Death/100 : ${Math.trunc(
          (appData.covidAPI.Global.NewDeaths * 100000) / this.currentPopulation
        )}`;
        this.weakTotalNumber.innerHTML = ` New Recovered/100: ${Math.trunc(
          (appData.covidAPI.Global.NewRecovered * 100000) /
            this.currentPopulation
        )} `;
        this.recoverTotalNumber.innerHTML = ` New Confirmed/100 : ${Math.trunc(
          (appData.covidAPI.Global.NewConfirmed * 100000) /
            this.currentPopulation
        )} `;
      }
    } else {
      this.countryName.textContent = `${this.country.Country}`;
      if (this.isTotalTimeSet && this.isTotalNumberSet) {
        this.deathTotalNumber.innerHTML = `Total Deaths : ${this.country.TotalDeaths} `;
        this.weakTotalNumber.innerHTML = ` Total Recovered : ${this.country.TotalRecovered} `;
        this.recoverTotalNumber.innerHTML = ` Total Confirmed : ${this.country.TotalConfirmed} `;
      }
      if (this.isStrictTimeSet && this.isTotalNumberSet) {
        this.deathTotalNumber.innerHTML = ` New Deaths : ${this.country.NewDeaths} `;
        this.weakTotalNumber.innerHTML = ` New Recovered : ${this.country.NewRecovered} `;
        this.recoverTotalNumber.innerHTML = ` New Confirmed : ${this.country.NewConfirmed} `;
      }
      if (this.isTotalTimeSet && this.isStrictNumberSet) {
        this.deathTotalNumber.innerHTML = ` Total Death/100 : ${Math.trunc(
          (this.country.TotalDeaths * 100000) / this.currentPopulation
        )}`;
        this.weakTotalNumber.innerHTML = ` Total Recovered/100: ${Math.trunc(
          (this.country.TotalRecovered * 100000) / this.currentPopulation
        )} `;
        this.recoverTotalNumber.innerHTML = ` Total Confirmed/100 : ${Math.trunc(
          (this.country.TotalConfirmed * 100000) / this.currentPopulation
        )} `;
      }
      if (this.isStrictTimeSet && this.isStrictNumberSet) {
        this.deathTotalNumber.innerHTML = ` New Death/100 : ${Math.trunc(
          (this.country.NewDeaths * 100000) / this.currentPopulation
        )}`;
        this.weakTotalNumber.innerHTML = ` New Recovered/100: ${Math.trunc(
          (this.country.NewRecovered * 100000) / this.currentPopulation
        )} `;
        this.recoverTotalNumber.innerHTML = ` New Confirmed/100 : ${Math.trunc(
          (this.country.NewConfirmed * 100000) / this.currentPopulation
        )} `;
      }
    }
  },
  checkState() {
    if (this.dayTime.classList.contains("hide")) {
      this.isTotalTimeSet = true;
      this.isStrictTimeSet = false;
    } else {
      this.isTotalTimeSet = false;
      this.isStrictTimeSet = true;
    }
    if (this.strictNumber.classList.contains("hide")) {
      this.isTotalNumberSet = true;
      this.isStrictNumberSet = false;
    } else {
      this.isTotalNumberSet = false;
      this.isStrictNumberSet = true;
    }
  },
  calcPopulation() {
    if (appData.CountryCode === "Global") {
      this.currentPopulation = appData.countriesAPI.reduce(
        (acc, elem) => acc + elem.population,
        0
      );
    } else {
      const country = appData.countriesAPI.find((elem) => {
        if (elem.name === this.country.Country) {
          return elem;
        }
        return false;
      });
      this.currentPopulation = country.population;
    }
    return this.currentPopulation;
  },
  findCountry() {
    if (appData.CountryCode === "Global") {
      this.country = null;
    } else {
      this.country = appData.covidAPI.Countries.find((element) => {
        if (element.CountryCode === appData.CountryCode) return element;
        return false;
      });
    }
    return this.country;
  },
  showInfoLastDayor() {},
  showInfoGlobalDays() {},
  showInfoAbsoluteNumber() {},
  showInfoPerNumber() {},
};
export default info;
