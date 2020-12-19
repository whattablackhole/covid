(() => {
  "use strict";
  const e = { currentCountry: "Global", covidAPI: {}, country: {}, countriesAPI: {} },
    t = {
      async getData() {
        await this.checkSavedData();
      },
      dataFetch: async (e) => fetch(`${e}`).then((e) => e.json()),
      async getCountryDate() {
        const t = new Date().toISOString().slice(0, 10),
          o = new Date();
        o.setDate(o.getDate() - 1);
        const a = `https://api.covid19api.com/country/Belarus?from=${o.toISOString().slice(0, 10)}T00:00:00Z&to=${t}T00:00:00Z;`,
          s = await this.dataFetch(a);
        e.country = { ...s };
      },
      getTotalCasesDeathsRecovered(t) {
        let o = null,
          a = null,
          s = null;
        return (
          e.covidAPI.Countries.forEach((e) => {
            e.CountryCode === t && ((o = e.TotalConfirmed), (a = e.TotalDeaths), (s = e.TotalRecovered));
          }),
          [o, a, s]
        );
      },
      async checkSavedData() {
        if (localStorage.covidAPI && localStorage.countriesAPI) {
          const t = new Date().toISOString().slice(0, 10);
          JSON.parse(localStorage.covidAPI).Date.slice(0, 10) !== t && (await this.updateAPI()), (e.covidAPI = JSON.parse(localStorage.covidAPI)), (e.countriesAPI = JSON.parse(localStorage.countriesAPI));
        } else await this.updateAPI();
      },
      async updateAPI() {
        const t = await this.dataFetch("https://api.covid19api.com/summary"),
          o = await this.dataFetch("https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code;");
        "Caching in progress" !== t.Message ? ((localStorage.covidAPI = JSON.stringify(t)), (localStorage.countriesAPI = JSON.stringify(o)), (e.covidAPI = { ...t }), (e.countriesAPI = [...o])) : alert("Updating data.");
      },
    },
    o = {
      choseCountry(t) {
        (e.currentCountry = t), console.log(e.currentCountry);
      },
    },
    a = { sortBy: "cases", sortDirection: "down" },
    s = { cases: 0, deaths: 1, recovered: 2 },
    c = { up: "expand_less", down: "expand_more" },
    r = {
      async create() {
        const o = e.countriesAPI;
        let c = [];
        const r = document.querySelector(".countries__list");
        o.forEach((e) => {
          if (((c = t.getTotalCasesDeathsRecovered(e.alpha2Code)), null == c[0])) return;
          const o = document.createElement("li"),
            n = document.createElement("button"),
            i = document.createElement("span"),
            d = document.createElement("span"),
            l = document.createElement("span");
          n.classList.add("countries__item"), i.classList.add("countries__data"), d.classList.add("countries__flag"), l.classList.add("countries__country-name"), i.setAttribute("data-cases", c[0]), i.setAttribute("data-deaths", c[1]), i.setAttribute("data-recovered", c[2]), (i.innerHTML = c[s[a.sortBy]]), (d.style.backgroundImage = `url(${e.flag})`), (l.innerHTML = e.name), n.append(i, d, l), this.addClickListener(n, e.alpha2Code), o.append(n), r.append(o);
        });
      },
      addClickListener(e, t) {
        e.addEventListener("click", () => {
          o.choseCountry(t);
        });
      },
      changeValues() {
        const e = document.querySelectorAll(".countries__list li"),
          t = a.sortBy;
        e.forEach((e) => {
          const o = e.childNodes[0].childNodes[0],
            a = e.childNodes[0].childNodes[0].dataset[t];
          o.innerHTML = `${a}`;
        });
      },
    },
    n = {
      addOnChangeListener() {
        const e = document.querySelector(".countries__input");
        e.addEventListener("input", () => {
          this.search(e);
        });
      },
      search(e) {
        const t = e.value.toLowerCase(),
          o = document.querySelectorAll(".countries__list li"),
          a = new RegExp(`${t}`);
        o.forEach((e) => {
          const t = e.childNodes[0].childNodes[2].innerHTML;
          a.test(t.toLowerCase()) ? e.classList.remove("hide") : e.classList.add("hide");
        });
      },
    },
    i = {
      sort() {
        let e = document.querySelectorAll(".countries__list li");
        (e = Array.prototype.slice.call(e, 0)),
          e.sort((e, t) => {
            const o = e.childNodes[0].childNodes[0].innerHTML,
              s = t.childNodes[0].childNodes[0].innerHTML;
            return "up" === a.sortDirection ? o - s : s - o;
          });
        const t = document.querySelector(".countries__list");
        (t.innerHTML = ""),
          e.forEach((e) => {
            t.append(e);
          });
      },
    },
    d = {
      create() {
        const e = document.querySelector(".countries__sort-method"),
          t = document.querySelector(".countries__sort-type");
        this.updateSortByButtonName(), this.updateSortDirectionButtonIcon(), this.addClickListener(e, t), i.sort();
      },
      addClickListener(e, t) {
        e.addEventListener("click", () => {
          this.changeSortBy(), i.sort();
        }),
          t.addEventListener("click", () => {
            this.changeSortDirection(), i.sort();
          });
      },
      changeSortBy() {
        switch (a.sortBy) {
          case "cases":
            a.sortBy = "deaths";
            break;
          case "deaths":
            a.sortBy = "recovered";
            break;
          case "recovered":
            a.sortBy = "cases";
        }
        this.updateSortByButtonName(), r.changeValues();
      },
      changeSortDirection() {
        switch (a.sortDirection) {
          case "down":
            a.sortDirection = "up";
            break;
          case "up":
            a.sortDirection = "down";
        }
        this.updateSortDirectionButtonIcon();
      },
      updateSortByButtonName() {
        document.querySelector(".countries__sort-method").innerHTML = a.sortBy;
      },
      updateSortDirectionButtonIcon() {
        document.querySelector(".material-icons").innerHTML = c[a.sortDirection];
      },
    };
  (async () => {
    await t.getData(), r.create(), n.addOnChangeListener(), d.create();
  })();
})();
