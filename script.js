const startScreenElement = document.getElementById("start-screen");

const gameScreenElement = document.getElementById("game-screen");

const gamerOverScreenElement = document.getElementById("game-over-screen");

const startButton = startScreenElement.querySelector("button");
const playAgainButton = gamerOverScreenElement.querySelector("button");
const game = new Game(gameScreenElement, gamerOverScreenElement);

startButton.addEventListener("click", () => {
  game.start();

  startScreenElement.style.display = "none";
  gameScreenElement.style.display = "";
});

playAgainButton.addEventListener("click", () => {
  game.start();

  gamerOverScreenElement.style.display = "none";
  gameScreenElement.style.display = "";
});
