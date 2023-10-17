const square = document.querySelector(".square");
const count = document.querySelector(".square  h1");
const change = document.querySelector(".change");

change.addEventListener("click", () => {
  let nr = parseInt(count.innerText);
  nr++;
  count.innerText = nr;

  const changeColor = `hsl(${Math.random() * 360}, 90%, 70%)`;
  // const changeBoxShadow = `hsl(${Math.random() * 360}, 50%, 30%)`;

  square.style.backgroundColor = changeColor;
  square.style.boxShadow = `0px 0px 20px 10px ${changeColor}`;
});
