const container = document.querySelector("#container");

const body = document.querySelector("body");

const controls = document.querySelector("#controls");

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

function changeGreyscale() {
  const gridItems = document.querySelectorAll(".griditem");
  gridItems.forEach(gridItem => {
    gridItem.removeEventListener("mouseover", colorHandler);
    gridItem.addEventListener("mouseover", greyscaleHandler);
  });
}

let greyscaleHandler = event => {
  let currentValue = event.target.dataset.value;
  event.target.style.backgroundColor =
    "rgb(" + currentValue + "," + currentValue + "," + currentValue + ")";
};

const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
controls.appendChild(resetButton);
resetButton.addEventListener("click", () => {
  let squares = prompt("How many squares per side?", 16);
  clearContainer();
  createNewGrid(squares);
});

const colorButton = document.createElement("button");
colorButton.textContent = "Color";
controls.appendChild(colorButton);
colorButton.addEventListener("click", () => {
  changeColor();
});

function changeColor() {
  const gridItems = document.querySelectorAll(".griditem");
  gridItems.forEach(gridItem => {
    gridItem.removeEventListener("mouseover", greyscaleHandler);
    gridItem.addEventListener("mouseover", colorHandler);
  });
}

let colorHandler = event => {
  event.target.dataset.value = 110;
  event.target.style.backgroundColor =
    "rgb(" + getRandomInt() + "," + getRandomInt() + "," + getRandomInt() + ")";
};

const greyscaleButton = document.createElement("button");
greyscaleButton.textContent = "Greyscale";
controls.appendChild(greyscaleButton);

greyscaleButton.addEventListener("click", () => {
  changeGreyscale();
});

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(255));
}

function getPercentage(squares) {
  return 100 / squares + "%";
}

function clearContainer() {
  document.getElementById("container").innerHTML = "";
}
