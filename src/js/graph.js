import appData from "./app.data.js";
// import mapBehavior from "./map.behavior.js";
import info from "./info.js";
import APIBehavior from "./API.behavior.js";

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
  deathsBtn: document.querySelector("#deaths"),
  recovoredBtn: document.querySelector("#recovored"),
  confirmedBtn: document.querySelector("#confirmed"),
  initListeners() {
    if (this.listersInited === true) {
      return;
    }
    this.listersInited = true;
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
    console.log("hello");
    this.updateInfo();
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
      ], // days
      datasets: [
        {
          label: "Global",
          data: [400, 700, 800, 900, 1200, 1500], // ceases
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

  createChart() {
    // eslint-disable-next-line
    this.myChart = new Chart(this.ctx, this.chartConfig);
  },

  getCountryDate() {
    console.log(info.currentPopulation);
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
          Math.trunc((element.Deaths * 1000000) / info.currentPopulation)
        );
      else {
        this.allDeaths.push(element.Deaths);
      }
    });
    appData.countryStats.forEach((element) => {
      if (info.isStrictNumberSet)
        this.allConfirms.push(
          Math.trunc((element.Confirmed * 1000000) / info.currentPopulation)
        );
      else {
        this.allConfirms.push(element.Confirmed);
      }
    });
    appData.countryStats.forEach((element) => {
      if (info.isStrictNumberSet)
        this.allRecovered.push(
          Math.trunc((element.Recovered * 1000000) / info.currentPopulation)
        );
      else {
        this.allRecovered.push(element.Recovered);
      }
    });
  },
  dividePopulation() {
    if (this.isStrictTimeSet && this.isStrictNumberSet) {
      return [
        Math.trunc(appData.covidAPI.Global.NewDeaths * 100000),
        Math.trunc(
          (appData.covidAPI.Global.NewRecovered * 100000) /
            this.currentPopulation
        ),
        Math.trunc(
          (appData.covidAPI.Global.NewConfirmed * 100000) /
            this.currentPopulation
        ),
      ];
    }
    return [
      Math.trunc(
        (appData.covidAPI.Global.TotalDeaths * 100000) / this.currentPopulation
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
      this.chartConfig.data.datasets[0].label = "Global";
      this.chartConfig.type = "bar";
      this.createChart();
      if (info.isTotalTimeSet && info.isTotalNumberSet) {
        // info.istot
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
            (appData.covidAPI.Global.NewDeaths * 100000) /
              info.currentPopulation
          ),
          Math.trunc(
            (appData.covidAPI.Global.NewRecovered * 100000) /
              info.currentPopulation
          ),
          Math.trunc(
            (appData.covidAPI.Global.NewConfirmed * 100000) /
              info.currentPopulation
          ),
        ];
        this.myChart.update();
      }
    } else {
      document.querySelector(".graph-wrapper").classList.remove("hide");
      this.chartConfig.data.datasets[0].label = `${this.country.Country}`;
      this.chartConfig.type = "line";
      this.myChart.destroy();
      this.createChart();
      await APIBehavior.getGlobalFrom(this.country.Country);
      await APIBehavior.getCountryDate(this.country.Country);
      console.log(appData.countryStats);
      this.getCountryDate();
      if (info.isStrictTimeSet) {
        if (this.myChart !== null) {
          this.myChart.destroy();
        }
        this.chartConfig.type = "bar";
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
              (info.country.NewDeaths * 100000) / info.currentPopulation
            ),
            Math.trunc(
              (info.country.NewRecovered * 100000) / info.currentPopulation
            ),
            Math.trunc(
              (info.country.NewConfirmed * 100000) / info.currentPopulation
            ),
          ];
          this.myChart.update();
        }
      } else {
        if (this.deathsBtn.checked === true) {
          this.myChart.data.labels = this.allDates;
          this.myChart.data.datasets[0].data = [...this.allDeaths];
          this.myChart.update();
        }
        if (this.confirmedBtn.checked === true) {
          this.myChart.data.labels = this.allDates;
          this.myChart.data.datasets[0].data = [...this.allConfirms];
          this.myChart.update();
        }
        if (this.recovoredBtn.checked === true) {
          console.log("a");
          console.log(this.allRecovered);
          this.myChart.data.labels = this.allDates;
          this.myChart.data.datasets[0].data = [...this.allRecovered];
          this.myChart.update();
        }
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
