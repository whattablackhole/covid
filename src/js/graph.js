import appData from "./app.data.js";
import info from "./info.js";
import APIBehavior from "./API.behavior.js";
import chartConfig from "./chart.config.js";

const graph = {
  ctx: document.getElementById("myChart"),
  deathsBtn: document.querySelector("#deaths"),
  recoveredBtn: document.querySelector("#recovered"),
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
  globalStats: {
    deaths: undefined,
    cases: undefined,
    recovered: undefined,
  },
  initListeners() {
    if (this.isListersInited === true) {
      return;
    }
    this.isListersInited = true;
    this.deathsBtn.addEventListener("click", this.changeText.bind(this));
    this.recoveredBtn.addEventListener("click", this.changeText.bind(this));
    this.confirmedBtn.addEventListener("click", this.changeText.bind(this));
  },
  changeText(e) {
    if (e.target.id === "deaths") {
      this.deathsBtn.checked = true;
      this.recoveredBtn.checked = false;
      this.confirmedBtn.checked = false;
    } else if (e.target.id === "confirmed") {
      this.confirmedBtn.checked = true;
      this.recoveredBtn.checked = false;
      this.deathsBtn.checked = false;
    } else {
      this.recoveredBtn.checked = true;
      this.confirmedBtn.checked = false;
      this.deathsBtn.checked = false;
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
  toStrictNumber() {
    this.globalStats.deaths = Object.values(appData.globalStats.deaths);
    this.globalStats.deaths = this.globalStats.deaths.map((key) =>
      Math.trunc((key * graph.divisor) / info.currentPopulation)
    );
    this.globalStats.cases = Object.values(appData.globalStats.cases);
    this.globalStats.cases = this.globalStats.cases.map((key) =>
      Math.trunc((key * graph.divisor) / info.currentPopulation)
    );
    this.globalStats.recovered = Object.values(appData.globalStats.recovered);
    this.globalStats.recovered = this.globalStats.recovered.map((key) =>
      Math.trunc((key * graph.divisor) / info.currentPopulation)
    );
  },
  toTotalNumber() {
    this.globalStats.cases = Object.values(appData.globalStats.cases);
    this.globalStats.deaths = Object.values(appData.globalStats.deaths);
    this.globalStats.recovered = Object.values(appData.globalStats.recovered);
  },
  toStrictTime() {
    const tempDeaths = Array.from(this.globalStats.deaths);
    this.globalStats.deaths = this.globalStats.deaths.map((key, index) => {
      if (index === 0) return key;
      return key - tempDeaths[index - 1];
    });
    const tempCases = Array.from(this.globalStats.cases);
    this.globalStats.cases = this.globalStats.cases.map((key, index) => {
      if (index === 0) return key;
      return key - tempCases[index - 1];
    });
    const tempRecovored = Array.from(this.globalStats.recovered);
    this.globalStats.recovered = this.globalStats.recovered.map(
      (key, index) => {
        if (index === 0) return key;
        return Math.abs(key - tempRecovored[index - 1]);
      }
    );
  },
  toTotalTime() {
    this.globalStats.cases = Object.values(appData.globalStats.cases);
    this.globalStats.deaths = Object.values(appData.globalStats.deaths);
    this.globalStats.recovered = Object.values(appData.globalStats.recovered);
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
      await APIBehavior.getGlobalStats();
      chartConfig.data.datasets[0].label = "Global";
      chartConfig.type = "bar";
      this.createChart();
      if (info.isTotalTimeSet) {
        this.toTotalTime();
      }
      if (info.isTotalNumberSet) {
        this.toTotalNumber();
      }
      if (info.isStrictNumberSet) {
        this.toStrictNumber();
      }
      if (info.isStrictTimeSet) {
        this.toStrictTime();
      }

      if (this.deathsBtn.checked === true) {
        this.myChart.data.labels = Object.keys(appData.globalStats.deaths);
        this.myChart.data.datasets[0].data = this.globalStats.deaths;
      }
      if (this.confirmedBtn.checked === true) {
        this.myChart.data.labels = Object.keys(appData.globalStats.cases);
        this.myChart.data.datasets[0].data = this.globalStats.cases;
      }
      if (this.recoveredBtn.checked === true) {
        this.myChart.data.labels = Object.keys(appData.globalStats.recovered);
        this.myChart.data.datasets[0].data = this.globalStats.recovered;
      }
    } else {
      chartConfig.data.datasets[0].label = `${this.country.Country}`;
      chartConfig.type = "line";
      this.myChart.destroy();
      this.createChart();
      await APIBehavior.getCountryStats(this.country.Country);
      this.getCountryDate();
      if (info.isStrictTimeSet) {
        if (this.myChart !== null) {
          this.myChart.destroy();
        }
        this.createChart();
        if (info.isTotalNumberSet) {
          if (this.deathsBtn.checked === true) {
            const compareArr = Object.values(
              appData.countryStatsObj.timeline.deaths
            );
            let tempDeaths = Object.values(
              appData.countryStatsObj.timeline.deaths
            );
            tempDeaths = tempDeaths.map((key, index) => {
              if (index === 0) return key;
              return key - compareArr[index - 1];
            });
            this.myChart.data.labels = Object.keys(
              appData.countryStatsObj.timeline.deaths
            );
            this.myChart.data.datasets[0].data = tempDeaths;
          }

          if (this.confirmedBtn.checked === true) {
            const compareArr = Object.values(
              appData.countryStatsObj.timeline.cases
            );
            let tempCases = Object.values(
              appData.countryStatsObj.timeline.cases
            );
            tempCases = tempCases.map((key, index) => {
              if (index === 0) return key;
              return key - compareArr[index - 1];
            });
            this.myChart.data.labels = Object.keys(
              appData.countryStatsObj.timeline.cases
            );
            this.myChart.data.datasets[0].data = tempCases;
          }
          if (this.recoveredBtn.checked === true) {
            const compareArr = Object.values(
              appData.countryStatsObj.timeline.recovered
            );
            let tempRecovered = Object.values(
              appData.countryStatsObj.timeline.recovered
            );
            tempRecovered = tempRecovered.map((key, index) => {
              if (index === 0) return key;
              return key - compareArr[index - 1];
            });
            this.myChart.data.labels = Object.keys(
              appData.countryStatsObj.timeline.recovered
            );
            this.myChart.data.datasets[0].data = tempRecovered;
          }
        } else {
          if (this.recoveredBtn.checked === true) {
            let compareArr = Object.values(
              appData.countryStatsObj.timeline.recovered
            );
            compareArr = compareArr.map((key) =>
              Math.trunc((key * this.divisor) / this.currentPopulation)
            );
            let tempRecovered = Object.values(
              appData.countryStatsObj.timeline.recovered
            );
            tempRecovered = tempRecovered.map((key, index) => {
              if (index === 0)
                return Math.trunc(
                  (key * this.divisor) / this.currentPopulation
                );
              return (
                Math.trunc((key * this.divisor) / this.currentPopulation) -
                compareArr[index - 1]
              );
            });
            this.myChart.data.labels = Object.keys(
              appData.countryStatsObj.timeline.recovered
            );
            this.myChart.data.datasets[0].data = tempRecovered;
          }
          if (this.deathsBtn.checked === true) {
            let compareArr = Object.values(
              appData.countryStatsObj.timeline.deaths
            );
            compareArr = compareArr.map((key) =>
              Math.trunc((key * this.divisor) / this.currentPopulation)
            );
            let tempDeaths = Object.values(
              appData.countryStatsObj.timeline.deaths
            );
            tempDeaths = tempDeaths.map((key, index) => {
              if (index === 0)
                return Math.trunc(
                  (key * this.divisor) / this.currentPopulation
                );
              return (
                Math.trunc((key * this.divisor) / this.currentPopulation) -
                compareArr[index - 1]
              );
            });
            this.myChart.data.labels = Object.keys(
              appData.countryStatsObj.timeline.deaths
            );
            this.myChart.data.datasets[0].data = tempDeaths;
          }
          if (this.confirmedBtn.checked === true) {
            let compareArr = Object.values(
              appData.countryStatsObj.timeline.cases
            );
            compareArr = compareArr.map((key) =>
              Math.trunc((key * this.divisor) / this.currentPopulation)
            );
            let tempCases = Object.values(
              appData.countryStatsObj.timeline.cases
            );
            tempCases = tempCases.map((key, index) => {
              if (index === 0)
                return Math.trunc(
                  (key * this.divisor) / this.currentPopulation
                );
              return (
                Math.trunc((key * this.divisor) / this.currentPopulation) -
                compareArr[index - 1]
              );
            });
            this.myChart.data.labels = Object.keys(
              appData.countryStatsObj.timeline.cases
            );
            this.myChart.data.datasets[0].data = tempCases;
          }
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
        if (this.recoveredBtn.checked === true) {
          this.myChart.data.labels = this.allDates;
          this.myChart.data.datasets[0].data = [...this.allRecovered];
        }
      }
    }
    this.myChart.update();
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
