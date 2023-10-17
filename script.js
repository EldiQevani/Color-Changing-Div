const square = document.querySelector(".square");
const count = document.querySelector(".square  h1");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  let nr = parseInt(count.innerText);
  nr++;
  count.innerText = nr;

  const changeColor = `hsl(${Math.random() * 360}, 90%, 70%)`;
  const changeBoxShadow = `hsl(${Math.random() * 360}, 70%, 20%)`;

  square.style.backgroundColor = changeColor;
  square.style.boxShadow = `0px 0px 20px 10px ${changeBoxShadow}`;
});
