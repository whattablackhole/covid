const searchBehavior = {
  addOnChangeListener() {
    const input = document.querySelector(".countries__input");
    input.addEventListener("input", () => {
      this.search(input);
    });
  },

  search(input) {
    const value = input.value.toLowerCase();
    const list = document.querySelectorAll(".countries__list li");
    const regex = new RegExp(`${value}`);

    list.forEach((element) => {
      const countryInListName = element.childNodes[0].childNodes[2].innerHTML;
      if (regex.test(countryInListName.toLowerCase())) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    });
  },
};

export default searchBehavior;
