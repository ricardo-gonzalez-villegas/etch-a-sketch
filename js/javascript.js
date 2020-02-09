//Coded by Ricardo Gonzalez
const container = document.querySelector("#container");
const body = document.querySelector("body");
const controls = document.querySelector("#controls");
const resetContainer = document.querySelector("#reset-container");

createGrid();

function createGrid() {
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      const gridItem = document.createElement("div");
      container.appendChild(gridItem).classList.add("griditem");
    }
  }
  addInitialHandler();
}

function createNewGrid(squares) {
  if (squares) {
    const logo = document.querySelector("#logo");
    logo.innerHTML = squares + " x " + squares + " Etch-A-Sketch";
    for (let i = 0; i < squares; i++) {
      for (let j = 0; j < squares; j++) {
        const gridItem = document.createElement("div");
        container.appendChild(gridItem).classList.add("griditem");
        gridItem.style.width = getPercentage(squares);
        gridItem.style.height = getPercentage(squares);
      }
    }
  }
  addInitialHandler();
}

function addInitialHandler() {
  const gridItems = document.querySelectorAll(".griditem");
  gridItems.forEach(gridItem => {
    gridItem.addEventListener("mouseover", event => {
      if (!event.target.dataset.value) {
        event.target.dataset.value = 100;
      } else {
        event.target.dataset.value = event.target.dataset.value - 10;
        if (event.target.dataset.value < 0) {
          event.target.dataset.value = 0;
        }
      }
      let currentValue = event.target.dataset.value;
      event.target.style.backgroundColor =
        "rgb(" + currentValue + "," + currentValue + "," + currentValue + ")";
    });
  });
}
const greyscaleButton = document.createElement("button");
greyscaleButton.textContent = "Greyscale";

const greyscaleButtonContainer = document.createElement("div");
greyscaleButtonContainer.appendChild(greyscaleButton).classList.add("leftside");
controls.appendChild(greyscaleButtonContainer);

greyscaleButton.addEventListener("click", () => {
  changeGreyscale();
});

let greyscaleHandler = event => {
  let currentValue = event.target.dataset.value;
  event.target.style.backgroundColor =
    "rgb(" + currentValue + "," + currentValue + "," + currentValue + ")";
};

function changeGreyscale() {
  const gridItems = document.querySelectorAll(".griditem");
  gridItems.forEach(gridItem => {
    gridItem.removeEventListener("mouseover", colorHandler);
    gridItem.addEventListener("mouseover", greyscaleHandler);
  });
}

const resetButton = document.createElement("button");
resetButton.textContent = "Reset";

const resetButtonContainer = document.createElement("div");
resetButtonContainer.appendChild(resetButton).classList.add("reset");
resetContainer.appendChild(resetButtonContainer);

resetButton.addEventListener("click", () => {
  let squares = prompt("How many squares per side? (Between 16 & 120)", 16);
  if (squares === "" || squares === null || squares < 16 || squares > 120) return;
  clearContainer();
  createNewGrid(squares);
});

const colorButton = document.createElement("button");
colorButton.textContent = "Colored";

const colorButtonContainer = document.createElement("div");
colorButtonContainer.appendChild(colorButton).classList.add("rightside");
controls.appendChild(colorButtonContainer);

colorButton.addEventListener("click", () => {
  changeColor();
});

let colorHandler = event => {
  event.target.dataset.value = 110;
  event.target.style.backgroundColor =
    "rgb(" + getRandomInt() + "," + getRandomInt() + "," + getRandomInt() + ")";
};

function changeColor() {
  const gridItems = document.querySelectorAll(".griditem");
  gridItems.forEach(gridItem => {
    gridItem.removeEventListener("mouseover", greyscaleHandler);
    gridItem.addEventListener("mouseover", colorHandler);
  });
}

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(256));
}

function getPercentage(squares) {
  return 100 / squares + "%";
}

function clearContainer() {
  document.getElementById("container").innerHTML = "";
}