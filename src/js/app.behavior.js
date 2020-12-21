import appData from "./app.data.js";

const appBehavior = {
  addMouseoverListeners() {
    let dives = document.querySelector(".app-container").childNodes;
    dives = Object.values(dives).slice(0, -1);
    dives.forEach((div) => {
      div.addEventListener("mouseover", () => {
        const fullscreenButton = div.childNodes[0];
        fullscreenButton.style.opacity = 1;
      });
      div.addEventListener("mouseleave", () => {
        const fullscreenButton = div.childNodes[0];
        fullscreenButton.style.opacity = 0;
      });
    });
  },
  addFullscreenClick() {
    let buttons = document.querySelectorAll(".fullScreen__button");
    buttons = Object.values(buttons);
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        button.parentElement.parentElement.classList.toggle("fullscreen");
        button.parentElement.parentElement.scrollIntoView();
        if (
          button.parentElement.parentElement.classList.contains("fullscreen")
        ) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
        const mapSwitches = document.querySelector(".map__switches");
        // const graphToggle = document.querySelector(".graph-toggle.toggle-menu");
        mapSwitches.classList.toggle("hide");
        // graphToggle.classList.toggle("hide");

        const zone = button.parentElement.parentElement.classList[0];
        const currentAppZone = appData.fullScreenZone;
        if (!currentAppZone) {
          appData.fullScreenZone = zone;
        } else if (appData.fullScreenZone === zone) {
          appData.fullScreenZone = undefined;
        }

        const body = document.querySelector("body");
        body.classList.toggle("overflow");
      });
    });
  },
};
export default appBehavior;
