const square = document.querySelector(".square");
const count = document.querySelector(".square  h1");
const changeButton = document.querySelector(".change");
const undoButton = document.querySelector(".undo");
const redoButton = document.querySelector(".redo");
const memory = [];
let currIndex = -1;

function updateColor() {
  const changeColor = `hsl(${Math.random() * 360}, 90%, 70%)`;
  square.style.backgroundColor = changeColor;
  square.style.boxShadow = `0px 0px 20px 10px ${changeColor}`;
  return changeColor;
}

function memorize() {
  memory.splice(currIndex + 1);
  const currentMemory = {
    nr: parseInt(count.innerText),
    color: square.style.backgroundColor,
    boxShadow: square.style.boxShadow,
  };
  memory.push(currentMemory);
  currIndex = memory.length - 1;
}

function undo() {
  if (currIndex > 0) {
    currIndex--;
    const previousMemory = memory[currIndex];
    count.innerText = previousMemory.nr;
    square.style.backgroundColor = previousMemory.color;
    square.style.boxShadow = previousMemory.boxShadow;
  }
}

function redo() {
  if (currIndex < memory.length - 1) {
    currIndex++;
    const nextMemory = memory[currIndex];
    count.innerText = nextMemory.nr;
    square.style.backgroundColor = nextMemory.color;
    square.style.boxShadow = nextMemory.boxShadow;
  }
}

function changeColorNumber() {
  const newColor = updateColor();
  const newNr = parseInt(count.innerText) + 1;
  count.innerText = newNr;
  square.style.backgroundColor = newColor;
  square.style.boxShadow = `0px 0px 20px 10px ${newColor}`;
  memorize();
  memory[currIndex].color = newColor;
  memory[currIndex].nr = newNr;
  memory[currIndex].boxShadow = `0px 0px 20px 10px ${newColor}`;
}

changeButton.addEventListener("click", changeColorNumber);
undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);

updateColor();
memorize();

// changeButton.addEventListener("click", () => {
//   let nr = parseInt(count.innerText);
//   nr++;
//   count.innerText = nr;

//   const changeColor = `hsl(${Math.random() * 360}, 90%, 70%)`;

//   square.style.backgroundColor = changeColor;
//   square.style.boxShadow = `0px 0px 20px 10px ${changeColor}`;
// });
