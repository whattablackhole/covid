/* eslint-disable */
import appData from "./app.data.js";
import mapBehavior from "./map.behavior.js";

const graph = {
  myChart: null,
  ctx: document.getElementById("myChart"),
  allDates: [],
  allDeaths: [],
  allRecovered: [],
  allConfirms: [],
  country: null,
  isTotalNumberSet: true,
  isStrictNumberSet: false,
  isTotalTimeSet: true,
  isStrictTimeSet: false,
  currentPopulation: 0,
  listersInited: false,
  dayTime: document.querySelector(".graph-day-time"),
  totalTime: document.querySelector(".graph-whole-time"),
  totalNumber: document.querySelector(".graph-total-number"),
  strictNumber: document.querySelector(".graph-strict-number"),
  firstLeftArrow: document.querySelector(
    "div.graph-toggle.toggle-one > div.graph-arrow-left"
  ),
  firstRightArrow: document.querySelector(
    "div.graph-toggle.toggle-one > div.graph-arrow-right"
  ),
  secondLeftArrow: document.querySelector(
    "div.graph-toggle.toggle-two > div.graph-arrow-left"
  ),
  secondRightArrow: document.querySelector(
    "div.graph-toggle.toggle-two > div.graph-arrow-right"
  ),
  initListeners: function () {
    if (this.listersInited === true) {
      return;
    }
    this.listersInited = true;
    this.firstRightArrow.addEventListener("click", this.changeText.bind(this));
    this.firstLeftArrow.addEventListener("click", this.changeText.bind(this));
    this.secondRightArrow.addEventListener("click", this.changeText.bind(this));
    this.secondLeftArrow.addEventListener("click", this.changeText.bind(this));
  },
  changeText(e) {
    if (e.target.parentElement.classList.contains("toggle-one")) {
      this.dayTime.classList.toggle("hidden");
      this.totalTime.classList.toggle("hidden");
      if (appData.fullScreenZone === "graph")
        mapBehavior.onButtonClickSimulation("toNew", "graph");
    } else {
      this.totalNumber.classList.toggle("hidden");
      this.strictNumber.classList.toggle("hidden");
      if (appData.fullScreenZone === "graph")
        mapBehavior.onButtonClickSimulation("to100k", "graph");
    }
    this.updateInfo();
  },
  checkState() {
    if (this.dayTime.classList.contains("hidden")) {
      this.isTotalTimeSet = true;
      this.isStrictTimeSet = false;
    } else {
      this.isTotalTimeSet = false;
      this.isStrictTimeSet = true;
    }
    if (this.strictNumber.classList.contains("hidden")) {
      this.isTotalNumberSet = true;
      this.isStrictNumberSet = false;
    } else {
      this.isTotalNumberSet = false;
      this.isStrictNumberSet = true;
    }
  },
  chartConfig: {
    type: "line",
    data: {
      labels: [
        "2020-01-22",
        "2020-01-22",
        "2020-01-22",
        "2020-01-22",
        "2020-01-22",
        "2020-01-22",
      ], //days
      datasets: [
        {
          label: `Global`,
          data: [400, 700, 800, 900, 1200, 1500], //ceases
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  },
  createChart: function () {
    this.myChart = new Chart(this.ctx, this.chartConfig);
  },
  getCountryDate: function () {
    appData.countryStats.forEach((element) => {
      this.allDates.push(element.Date.slice(0, -10));
    });
    appData.countryStats.forEach((element) => {
      this.allDeaths.push(element.Deaths);
    });
    appData.countryStats.forEach((element) => {
      this.allConfirms.push(element.Confirmed);
    });
    appData.countryStats.forEach((element) => {
      this.allRecovered.push(element.Confirmed);
    });
    this.myChart.data.labels = this.allDates;
    this.myChart.data.datasets[0].data = [...this.allDeaths];
    this.myChart.update();
  },
  dividePopulation() {
    if (this.isStrictTimeSet && this.isStrictNumberSet) {
      return [
        Math.trunc(
          (appData.covidAPI.Global.NewDeaths * 100000) / this.currentPopulation
        ),
        Math.trunc(
          (appData.covidAPI.Global.NewDeaths * 100000) / this.currentPopulation
        ),
        Math.trunc(
          (appData.covidAPI.Global.NewDeaths * 100000) / this.currentPopulation
        ),
      ];
    } else {
      return [
        Math.trunc(
          (appData.covidAPI.Global.TotalDeaths * 100000) /
            this.currentPopulation
        ),
        Math.trunc(
          (appData.covidAPI.Global.TotalRecovered * 100000) /
            this.currentPopulation
        ),
        Math.trunc(
          (appData.covidAPI.Global.TotalConfirmed * 100000) /
            this.currentPopulation
        ),
      ];
    }
  },
  updateInfo: function () {
    if (this.myChart !== null) {
      this.myChart.destroy();
    }
    this.initListeners();
    this.findCountry();
    this.checkState();
    this.calcPopulation();
    if (appData.CountryCode === "Global") {
      this.chartConfig.data.datasets[0].label = `Global`;
      this.chartConfig.type = "bar";
      this.createChart();
      if (this.isTotalTimeSet && this.isTotalNumberSet) {
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
      if (this.isStrictTimeSet && this.isTotalNumberSet) {
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
      if (this.isTotalTimeSet && this.isStrictNumberSet) {
        this.myChart.data.labels = [
          "Total Death/100",
          "Total Recovered/100",
          "Total Confirmed/100",
        ];
        this.myChart.data.datasets[0].data = this.dividePopulation();
        this.myChart.update();
      }
      if (this.isStrictTimeSet && this.isStrictNumberSet) {
        this.myChart.data.labels = [
          "New Death/100",
          "New Recovered/100",
          "New Confirmed/100",
        ];
        this.myChart.data.datasets[0].data = this.dividePopulation();
        this.myChart.update();
      }
    } else {
      this.chartConfig.data.datasets[0].label = `${this.country.Country}`;
      this.chartConfig.type = "line";
      this.createChart();
      if (this.isTotalTimeSet && this.isTotalNumberSet) {
        this.myChart.data.labels = [
          "Total Deaths",
          "Total Recovered",
          "Total Confirms",
        ];
        this.myChart.data.datasets[0].data = [
          this.country.TotalDeaths,
          this.country.TotalRecovered,
          this.country.TotalConfirmed,
        ];
        this.myChart.update();
      }
      if (this.isStrictTimeSet && this.isTotalNumberSet)
        this.myChart.data.labels = [
          "Total Deaths",
          "Total Recovered",
          "Total Confirms",
        ];
      this.myChart.data.datasets[0].data = [
        this.country.NewDeaths,
        this.country.NewRecovered,
        this.country.NewConfirmed,
      ];
      this.myChart.update();
    }
    if (this.isTotalTimeSet && this.isStrictNumberSet) {
      this.myChart.data.labels = [
        "Total Deaths",
        "Total Recovered",
        "Total Confirms",
      ];
      this.myChart.data.datasets[0].data = [
        Math.trunc(
          (this.country.TotalDeaths * 100000) / this.currentPopulation
        ),
        Math.trunc(
          (this.country.TotalRecovered * 100000) / this.currentPopulation
        ),
        Math.trunc(
          (this.country.TotalConfirmed * 100000) / this.currentPopulation
        ),
      ];
      this.myChart.update();
    }
    if (this.isStrictTimeSet && this.isStrictNumberSet) {
      this.myChart.data.labels = [
        "Total Deaths",
        "Total Recovered",
        "Total Confirms",
      ];
      this.myChart.data.datasets[0].data = [
        Math.trunc((this.country.NewDeaths * 100000) / this.currentPopulation),
        Math.trunc(
          (this.country.NewRecovered * 100000) / this.currentPopulation
        ),
        Math.trunc(
          (this.country.NewConfirmed * 100000) / this.currentPopulation
        ),
      ];
      this.myChart.update();
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
