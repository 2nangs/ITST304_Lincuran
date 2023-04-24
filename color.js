const tilesContainer = document.querySelector(".tiles");
const colors = ["green", "violet", "crimson", "blue", "orange", "gold", "greenyellow", "red"];
const colorsPicklist = [...colors, ...colors];
const tileCount = colorsPicklist.length;


let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;
let score = 0;
let timer = 60; 


const scoreDisplay = document.querySelector(".score");
const timerDisplay = document.querySelector(".timer");


function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}


function updateTimer() {
  timerDisplay.textContent = `Time: ${timer}s`;
}


function tick() {
  timer--;
  updateTimer();
  if (timer <= 0) {
    clearInterval(timerInterval);
    alert("Time's up! Your final score is: " + score + ". Refresh to play again.");
  }
}


const timerInterval = setInterval(tick, 1000);

function buildTile(color) {
  const element = document.createElement("div");

  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false");

  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");

    if (
      awaitingEndOfMove ||
      revealed === "true" ||
      element == activeTile
    ) {
      return;
    }

   
    element.style.backgroundColor = color;

    if (!activeTile) {
      activeTile = element;

      return;
    }

    const colorToMatch = activeTile.getAttribute("data-color");

    if (colorToMatch === color) {
      element.setAttribute("data-revealed", "true");
      activeTile.setAttribute("data-revealed", "true");

      activeTile = null;
      awaitingEndOfMove = false;
      revealedCount += 2;
      score++;

      updateScore();

      if (revealedCount === tileCount) {
        clearInterval(timerInterval);
        alert(`You win with a score of ${score}! Refresh to play again.`);
      }

      return;
    }

    awaitingEndOfMove = true;

    setTimeout(() => {
      activeTile.style.backgroundColor = null;
      element.style.backgroundColor = null;

      awaitingEndOfMove = false;
      activeTile = null;
      if (score > 0) {
        score--;
      }
      updateScore();
    }, 1000);
  });

  return element;
}


for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPicklist.length);
  const color = colorsPicklist[randomIndex];
  const tile = buildTile(color);

  colorsPicklist.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}

updateScore();
updateTimer();
