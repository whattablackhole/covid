import appData from "./app.data.js";
// import mapBehavior from "./map.behavior.js";
import info from "./info.js";
import APIBehavior from "./API.behavior.js";
import chartConfig from "./chart.config.js";

const graph = {
  ctx: document.getElementById("myChart"),
  deathsBtn: document.querySelector("#deaths"),
  recovoredBtn: document.querySelector("#recovored"),
  confirmedBtn: document.querySelector("#confirmed"),
  myChart: null,
  country: null,
  allDates: [],
  allDeaths: [],
  allRecovered: [],
  allConfirms: [],
  isTotalNumberSet: true,
  isStrictNumberSet: false,
  isTotalTimeSet: true,
  isStrictTimeSet: false,
  isListersInited: false,
  currentPopulation: 0,
  divisor: 100000,
  initListeners() {
    if (this.isListersInited === true) {
      return;
    }
    this.isListersInited = true;
    this.deathsBtn.addEventListener("click", this.changeText.bind(this));
    this.recovoredBtn.addEventListener("click", this.changeText.bind(this));
    this.confirmedBtn.addEventListener("click", this.changeText.bind(this));
  },
  changeText(e) {
    if (e.target.id === "deaths") {
      this.deathsBtn.checked = true;
      this.recovoredBtn.checked = false;
      this.confirmedBtn.checked = false;
      // if (appData.fullScreenZone === "graph")
      //   mapBehavior.onButtonClickSimulation("toNew", "graph");
    } else if (e.target.id === "confirmed") {
      this.confirmedBtn.checked = true;
      this.recovoredBtn.checked = false;
      this.deathsBtn.checked = false;
      // if (appData.fullScreenZone === "graph")
      //   mapBehavior.onButtonClickSimulation("to100k", "graph");
    } else {
      this.recovoredBtn.checked = true;
      this.confirmedBtn.checked = false;
      this.deathsBtn.checked = false;
      // if (appData.fullScreenZone === "graph")
      //   mapBehavior.onButtonClickSimulation("to100k", "graph");
    }
    this.updateInfo();
  },
  createChart() {
    // eslint-disable-next-line
    this.myChart = new Chart(this.ctx, chartConfig);
  },
  getCountryDate() {
    this.allDates = [];
    this.allDeaths = [];
    this.allConfirms = [];
    this.allRecovered = [];
    appData.countryStats.forEach((element) => {
      this.allDates.push(element.Date.slice(0, -10));
    });
    appData.countryStats.forEach((element) => {
      if (info.isStrictNumberSet)
        this.allDeaths.push(
          Math.trunc((element.Deaths * this.divisor) / info.currentPopulation)
        );
      else {
        this.allDeaths.push(element.Deaths);
      }
    });
    appData.countryStats.forEach((element) => {
      if (info.isStrictNumberSet)
        this.allConfirms.push(
          Math.trunc(
            (element.Confirmed * this.divisor) / info.currentPopulation
          )
        );
      else {
        this.allConfirms.push(element.Confirmed);
      }
    });
    appData.countryStats.forEach((element) => {
      if (info.isStrictNumberSet)
        this.allRecovered.push(
          Math.trunc(
            (element.Recovered * this.divisor) / info.currentPopulation
          )
        );
      else {
        this.allRecovered.push(element.Recovered);
      }
    });
  },
  dividePopulation() {
    if (this.isStrictTimeSet && this.isStrictNumberSet) {
      return [
        Math.trunc(appData.covidAPI.Global.NewDeaths * this.divisor),
        Math.trunc(
          (appData.covidAPI.Global.NewRecovered * this.divisor) /
            this.currentPopulation
        ),
        Math.trunc(
          (appData.covidAPI.Global.NewConfirmed * this.divisor) /
            this.currentPopulation
        ),
      ];
    }
    return [
      Math.trunc(
        (appData.covidAPI.Global.TotalDeaths * this.divisor) /
          this.currentPopulation
      ),
      Math.trunc(
        (appData.covidAPI.Global.TotalRecovered * this.divisor) /
          this.currentPopulation
      ),
      Math.trunc(
        (appData.covidAPI.Global.TotalConfirmed * this.divisor) /
          this.currentPopulation
      ),
    ];
  },
  async updateInfo() {
    if (this.myChart !== null) {
      this.myChart.destroy();
    }
    this.initListeners();
    this.findCountry();
    info.checkState();
    this.calcPopulation();
    if (appData.CountryCode === "Global") {
      document.querySelector(".graph-wrapper").classList.add("hide");
      chartConfig.data.datasets[0].label = "Global";
      chartConfig.type = "bar";
      this.createChart();
      if (info.isTotalTimeSet && info.isTotalNumberSet) {
        this.myChart.data.labels = [
          "Total Deaths",
          "Total Recovered",
          "Total Confirms",
        ];
        this.myChart.data.datasets[0].data = [
          appData.covidAPI.Global.TotalDeaths,
          appData.covidAPI.Global.TotalRecovered,
          appData.covidAPI.Global.TotalConfirmed,
        ];
        this.myChart.update();
      }
      if (info.isStrictTimeSet && info.isTotalNumberSet) {
        this.myChart.data.labels = [
          "New Deaths",
          "New Recovered",
          "New Confirms",
        ];
        this.myChart.data.datasets[0].data = [
          appData.covidAPI.Global.NewDeaths,
          appData.covidAPI.Global.NewRecovered,
          appData.covidAPI.Global.NewConfirmed,
        ];
        this.myChart.update();
      }
      if (info.isTotalTimeSet && info.isStrictNumberSet) {
        this.myChart.data.labels = [
          "Total Death/100T",
          "Total Recovered/100T",
          "Total Confirmed/100T",
        ];
        this.myChart.data.datasets[0].data = this.dividePopulation();
        this.myChart.update();
      }
      if (info.isStrictTimeSet && info.isStrictNumberSet) {
        this.myChart.data.labels = [
          "New Death/100T",
          "New Recovered/100T",
          "New Confirmed/100T",
        ];

        this.myChart.data.datasets[0].data = [
          Math.trunc(
            (appData.covidAPI.Global.NewDeaths * this.divisor) /
              info.currentPopulation
          ),
          Math.trunc(
            (appData.covidAPI.Global.NewRecovered * this.divisor) /
              info.currentPopulation
          ),
          Math.trunc(
            (appData.covidAPI.Global.NewConfirmed * this.divisor) /
              info.currentPopulation
          ),
        ];
        this.myChart.update();
      }
    } else {
      document.querySelector(".graph-wrapper").classList.remove("hide");
      chartConfig.data.datasets[0].label = `${this.country.Country}`;
      chartConfig.type = "line";
      this.myChart.destroy();
      this.createChart();
      await APIBehavior.getGlobalFrom(this.country.Country);
      this.getCountryDate();
      if (info.isStrictTimeSet) {
        if (this.myChart !== null) {
          this.myChart.destroy();
        }
        chartConfig.type = "bar";
        this.createChart();
        if (info.isTotalNumberSet) {
          this.myChart.data.labels = [
            "New Deaths",
            "New Recovered",
            "New Confirmed",
          ];
          this.myChart.data.datasets[0].data = [
            info.country.NewDeaths,
            info.country.NewRecovered,
            info.country.NewConfirmed,
          ];
          this.myChart.update();
        } else {
          this.myChart.data.labels = [
            "New Deaths/100T",
            "New Recovered/100T",
            "New Confirmed/100T",
          ];
          this.myChart.data.datasets[0].data = [
            Math.trunc(
              (info.country.NewDeaths * this.divisor) / info.currentPopulation
            ),
            Math.trunc(
              (info.country.NewRecovered * this.divisor) /
                info.currentPopulation
            ),
            Math.trunc(
              (info.country.NewConfirmed * this.divisor) /
                info.currentPopulation
            ),
          ];
          this.myChart.update();
        }
      } else {
        if (this.deathsBtn.checked === true) {
          this.myChart.data.labels = this.allDates;
          this.myChart.data.datasets[0].data = [...this.allDeaths];
        }
        if (this.confirmedBtn.checked === true) {
          this.myChart.data.labels = this.allDates;
          this.myChart.data.datasets[0].data = [...this.allConfirms];
        }
        if (this.recovoredBtn.checked === true) {
          this.myChart.data.labels = this.allDates;
          this.myChart.data.datasets[0].data = [...this.allRecovered];
        }
        this.myChart.update();
      }
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
};

export default graph;
