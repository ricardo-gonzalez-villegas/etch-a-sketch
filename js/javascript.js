const container = document.querySelector("#container");

const body = document.querySelector("body");

const controls = document.querySelector("#controls");

let squares;

if (!squares) {
  createGrid();
}

function createGrid() {
  for (let i = 16; i > 0; i--) {
    for (let j = 1; j < 17; j++) {
      const gridItem = document.createElement("div");
      container.appendChild(gridItem).classList.add("griditem");
      //gridItem.setAttribute("id", "x" + j + "y" + i);
    }
  }
  addEvent();
}

function createNewGrid(squares) {
  if (squares) {
    for (let i = 0; i < squares; i++) {
      for (let j = 0; j < squares; j++) {
        const gridItem = document.createElement("div");
        container.appendChild(gridItem).classList.add("griditem");
        gridItem.style.width = getPercentage(squares);
        gridItem.style.height = getPercentage(squares);
        //gridItem.setAttribute("id", "x" + j + "y" + i);
      }
    }
  }
  addEvent();
}

function addEvent() {
  const gridItems = document.querySelectorAll(".griditem");
  gridItems.forEach(gridItem => {
    gridItem.addEventListener("mouseover", event => {
      event.target.style.background = "black";
    });
  });
}

const button = document.createElement("button");
button.textContent = "Reset";
controls.appendChild(button);

button.addEventListener("click", () => {
  squares = prompt("How many squares per side?", 16);
  clearContainer();
  createNewGrid(squares);
});

function getPercentage(squares) {
  return 100 / squares + "%";
}

function clearContainer() {
  document.getElementById("container").innerHTML = "";
}
