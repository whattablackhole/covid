import mapBehavior from "./map.behavior.js";
import { sortData } from "./sort.data.js";
import mapData from "./map.data.js";
import appData from "./app.data.js";

const map = {
  create() {
    const mapOptions = {
      center: [20, 50],
      zoom: 2,
      maxZoom: 6,
      minZoom: 1,
      noWrap: true,
    };
    const mapContainer = new L.Map("map", mapOptions);
    const layer = new L.TileLayer(
      "https://api.mapbox.com/styles/v1/neiroromo/ckitmzql301wm19o29p4b066i/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibmVpcm9yb21vIiwiYSI6ImNraXRtemxlMjBxNnYyd21tNjM1aThkZ3YifQ.51aEuxph6DwbOeR9eA0TMg"
    );
    mapContainer.addLayer(layer);
    this.addMarkers(mapContainer);
    this.addLegend(mapContainer);
    this.addControls(mapContainer);
    mapBehavior.changePopupText();
  },
  addMarkers(mapContainer) {
    const countries = document.querySelectorAll(".countries__data");
    countries.forEach((country) => {
      const iconMarker = document.createElement("span");
      const iconMarkerTooltip = document.createElement("span");
      const h2 = document.createElement("h2");
      const ul = document.createElement("ul");
      const li = document.createElement("li");
      const container = document.createElement("div");

      iconMarker.classList.add("icon-marker");
      iconMarkerTooltip.classList.add("icon-marker-tooltip");
      li.classList.add("map-marker");
      container.classList.add("icon");
      const attributes = [...country.attributes];
      attributes.shift();
      attributes.forEach((attr) => {
        li.setAttribute(attr.nodeName, attr.nodeValue);
      });

      h2.innerHTML = li.getAttribute("data-name");
      li.innerHTML = `${li.getAttribute("data-cases")}`;

      ul.append(li);
      iconMarkerTooltip.append(h2, ul);
      iconMarker.append(iconMarkerTooltip);
      container.append(iconMarker);

      const latlng = li.getAttribute("data-latlng").split(",");
      const html = container.innerHTML;

      const marker = new L.Marker(latlng, {
        icon: L.divIcon({
          className: "icon",
          html,
        }),
        riseOnHover: true,
      });

      marker.addTo(mapContainer);
    });
  },
  addLegend(mapContainer) {
    const legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "map__info map__legend");
      const { max } = sortData;
      const grades = [
        0,
        max * 0.0000001,
        max * 0.000001,
        max * 0.00001,
        max * 0.0001,
        max * 0.001,
        max * 0.01,
        max * 0.2,
        max * 0.5,
        max * 0.9,
      ];
      for (let i = 0; i < grades.length; i += 1) {
        div.innerHTML += `<i style="background: ${mapBehavior.getColor(
          grades[i] + 1,
          max
        )}"></i><span>> ${Math.floor(grades[i])}</span>`;
      }
      return div;
    };
    legend.addTo(mapContainer);
  },
  addControls(mapContainer) {
    const control = L.control({ position: "bottomright" });
    const container = document.createElement("div");
    const buttonSwitchToNew = document.createElement("button");
    const buttonSwitchTo100k = document.createElement("button");

    buttonSwitchToNew.classList.add("map__switch-toNew");
    buttonSwitchTo100k.classList.add("map__switch-to100k");
    container.classList.add("map__switches", "hide");
    buttonSwitchToNew.innerHTML = mapData.onlyNew
      ? "за последний день"
      : "за весь период";
    buttonSwitchTo100k.innerHTML = mapData.onlyTo100k
      ? "за 100 тыс"
      : "в абсолютных величинах";

    container.append(buttonSwitchToNew, buttonSwitchTo100k);
    control.onAdd = () => container;

    buttonSwitchToNew.addEventListener("click", () => {
      mapData.onlyNew = !mapData.onlyNew;
      mapBehavior.changePopupText();
      buttonSwitchToNew.innerHTML = mapData.onlyNew
        ? "за последний день"
        : "за весь период";
      if (appData.fullScreenZone !== "map") return;
      mapBehavior.onButtonClickSimulation("toNew", "map");
    });
    buttonSwitchTo100k.addEventListener("click", () => {
      mapData.onlyTo100k = !mapData.onlyTo100k;
      mapBehavior.changePopupText();
      buttonSwitchTo100k.innerHTML = mapData.onlyTo100k
        ? "за 100 тыс"
        : "в абсолютных величинах";
      if (appData.fullScreenZone !== "map") return;
      mapBehavior.onButtonClickSimulation("to100k", "map");
    });

    control.addTo(mapContainer);
  },
};

export default map;
