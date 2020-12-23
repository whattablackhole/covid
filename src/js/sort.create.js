import { sortData, valuesOfSortDirection } from "./sort.data.js";
import countriesList from "./countries-list.create.js";
import sortBehavior from "./sort.behavior.js";
import mapBehavior from "./map.behavior.js";

const sort = {
  create() {
    const sortByButton = document.querySelector(".countries__sort-method");
    const sortDirectionButton = document.querySelector(".countries__sort-type");

    this.updateSortByButtonName();
    this.updateSortDirectionButtonIcon();
    this.addClickListener(sortByButton, sortDirectionButton);

    sortBehavior.sort();
  },
  addClickListener(sortByButton, sortDirectionButton) {
    sortByButton.addEventListener("click", () => {
      this.changeSortBy();
      sortBehavior.sort();
      mapBehavior.changePopupText();
    });
    sortDirectionButton.addEventListener("click", () => {
      this.changeSortDirection();
      sortBehavior.sort();
    });
  },
  changeSortBy() {
    switch (sortData.sortBy) {
      case "cases":
        sortData.sortBy = "deaths";
        break;
      case "deaths":
        sortData.sortBy = "recovered";
        break;
      case "recovered":
        sortData.sortBy = "cases";
        break;
      default:
        break;
    }
    this.updateSortByButtonName();
    countriesList.changeValues();
  },
  changeSortDirection() {
    switch (sortData.sortDirection) {
      case "down":
        sortData.sortDirection = "up";
        break;
      case "up":
        sortData.sortDirection = "down";
        break;
      default:
        break;
    }
    this.updateSortDirectionButtonIcon();
  },

  updateSortByButtonName() {
    const sortByButton = document.querySelector(".countries__sort-method");
    const mapSortByButton = document.querySelector(".map__switch-sortBy");
    sortByButton.innerHTML = sortData.sortBy;
    if (mapSortByButton) mapSortByButton.innerHTML = sortData.sortBy;
  },
  updateSortDirectionButtonIcon() {
    const sortDirectionButton = document.querySelector(
      ".countries__sort-type .material-icons"
    );
    sortDirectionButton.innerHTML =
      valuesOfSortDirection[sortData.sortDirection];
  },
};

export default sort;
