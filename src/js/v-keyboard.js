import appData from "./app.data.js";

const textarea = document.querySelector(".use-keyboard-input");

const LineBreak = {
  eng: ["backspace", "p", "l", "m"],
};

const keyLayout = {
  eng: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "backspace",
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "done",
    "space",
  ],
};

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: [],
    lang: "eng",
  },

  init() {
    // Setup main elements
    if (document.querySelector(".keyboard")) {
      document.querySelector(".keyboard__keys").remove();
    } else {
      this.elements.main = document.createElement("div");
      this.elements.main.classList.add("keyboard", "keyboard--hidden", "glass");
    }
    this.elements.keysContainer = document.createElement("div");

    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this.createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      ".keyboard__key"
    );

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-button
    document.querySelectorAll(".use-keyboard-button").forEach((element) => {
      element.addEventListener("click", () => {
        if (!appData.keyboard) {
          this.open(element);
        } else {
          this.close(element);
        }
      });
    });
  },

  createKeys() {
    const fragment = document.createDocumentFragment();

    // Creates HTML for an icon
    const createIconHTML = (iconName) =>
      `<i class="material-icons">${iconName}</i>`;

    keyLayout[this.properties.lang].forEach((key) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        LineBreak[this.properties.lang].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide", "Backspace");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.delete();
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide", "Space");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.enterSymbol(" ");
          });

          break;

        case "done":
          keyElement.classList.add(
            "keyboard__key--wide",
            "keyboard__key--dark"
          );
          keyElement.innerHTML = createIconHTML("keyboard_hide");

          keyElement.addEventListener("click", () => {
            const button = document.querySelector(".use-keyboard-button");
            this.close(button);
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.enterSymbol(key);
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  open(element) {
    const button = element;
    this.elements.main.classList.remove("keyboard--hidden");
    appData.keyboard = true;
    button.childNodes[0].innerHTML = "keyboard_hide";
  },

  delete() {
    textarea.value = textarea.value.slice(0, -1);
    this.inputEventDispatch();
  },

  enterSymbol(text) {
    textarea.value += text;
    this.inputEventDispatch();
  },

  close(element) {
    const button = element;
    this.elements.main.classList.add("keyboard--hidden");
    appData.keyboard = false;
    button.childNodes[0].innerHTML = "keyboard";
  },

  inputEventDispatch() {
    const event = new Event("input");
    const input = document.querySelector(".countries__input");
    input.dispatchEvent(event);
  },
};
export default Keyboard;
