const square = document.querySelector(".square");
const count = document.querySelector(".square  h1");
const changeButton = document.querySelector(".change");
const undoButton = document.querySelector(".undo");
const redoButton = document.querySelector(".redo");
const memory = [];
let currIndex = -1;
const MAX_UNDO = 5;
const startingIndex = -1;
const colorArray = document.querySelector(".color-array");
const MAX_UNDO_DIFFERENCE = 5;

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

function changeColorNumber() {
  const newColor = updateColor();
  const newNr = parseInt(count.innerText) + 1;
  count.innerText = newNr;

  square.style.backgroundColor = newColor;
  square.style.boxShadow = `0px 0px 20px 10px ${newColor}`;
  memorize();
  updateColorArray();

  // Generate the pyramid and display it in the HTML document
  const pyramid = document.querySelector(".pyramid");
  pyramid.innerHTML = generatePyramid(newNr, newColor);
}

new Sortable(colorArray, {
  animation: 150,
  onUpdate: function (evt) {
    const colorElements = Array.from(colorArray.children);
    const newColors = colorElements.map(
      (element) => element.style.backgroundColor
    );
    const newMemory = memory.filter((memoryItem) =>
      newColors.includes(memoryItem.color)
    );
    memory.length = 0;
    Array.prototype.push.apply(memory, newMemory);
    currIndex = memory.length - 1;
  },
});

function updateColorArray() {
  const colorArray = document.querySelector(".color-array");
  colorArray.innerHTML = "";
  const recentColors = memory.slice(-6).map((memoryItem) => memoryItem.color);
  recentColors.forEach((color) => {
    const colorElement = createColorElement(color);
    colorArray.insertAdjacentElement("beforeend", colorElement);
  });
}

updateColorArray();

function applyMemoryState(memoryState) {
  count.innerText = memoryState.nr;
  square.style.backgroundColor = memoryState.color;
  square.style.boxShadow = memoryState.boxShadow;

  // Restore the color array order
  const colorElements = memoryState.colors.map((item) => {
    return createColorElement(item.color);
  });

  colorArray.innerHTML = "";
  colorElements.forEach((element) => {
    colorArray.appendChild(element);
  });
}

function generatePyramid(n, color) {
  let output = "";
  for (let i = 0; i < n; i++) {
    let row = "";
    for (let j = 0; j <= i; j++) {
      row += `<span class="letter" style="background-color: ${color};">${String.fromCharCode(
        (i % 26) + 65
      )}</span> `;
    }
    output += row.trim() + "<br/>";
  }
  return output;
}

function undo() {
  if (currIndex > 0) {
    currIndex--;
    applyMemoryState(memory[currIndex]);
  }
}

function redo() {
  if (currIndex < memory.length - 1) {
    currIndex++;
    applyMemoryState(memory[currIndex]);
  }
}

function createColorElement(color) {
  const colorElement = document.createElement("div");
  colorElement.className = "color-element";
  colorElement.style.backgroundColor = color;
  colorElement.draggable = true;
  colorElement.addEventListener("dragstart", function (event) {
    event.dataTransfer.setData("text/plain", color);
  });
  return colorElement;
}

changeButton.addEventListener("click", changeColorNumber);
undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);

updateColor();
memorize();

console.log(undo);
