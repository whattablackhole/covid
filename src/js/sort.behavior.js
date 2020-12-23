import { sortData } from "./sort.data.js";

const sortBehavior = {
  sort() {
    let toSort = document.querySelectorAll(".countries__list li");

    toSort = Array.prototype.slice.call(toSort, 0);

    toSort.sort((a, b) => {
      const aVal = a.childNodes[0].childNodes[0].innerHTML;
      const bVal = b.childNodes[0].childNodes[0].innerHTML;
      if (sortData.sortDirection === "up") {
        return aVal - bVal;
      }
      return bVal - aVal;
    });

    sortData.max = toSort[0].childNodes[0].childNodes[0].innerHTML;
    const parent = document.querySelector(".countries__list");
    parent.innerHTML = "";
    toSort.forEach((item) => {
      parent.append(item);
    });
  },
};

export default sortBehavior;
