const INITIAL_PLAYER1_X = 15;
const INITIAL_PLAYER1_Y = 235;
//this are the positions of the players at the beginning of the game.
const INITIAL_PLAYER2_X = 874;
const INITIAL_PLAYER2_Y = 235;

class Game {
  constructor(gameScreenElement, gameOverScreenElement) {
    this.gameScreenElement = gameScreenElement;
    this.gameOverScreenElement = gameOverScreenElement;
    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.enableControls();
    //creating the players and the ball in the game
    this.player = new Player(this, INITIAL_PLAYER1_X, INITIAL_PLAYER1_Y);
    this.player2 = new Player(this, INITIAL_PLAYER2_X, INITIAL_PLAYER2_Y);
    this.ball = new Ball(this, "red");
    this.scorePlayer1 = new Scores(this, 250, 100, 0);
    this.scorePlayer2 = new Scores(this, 600, 100, 0);
    this.reset();
  }

  reset() {
    this.player = new Player(this, INITIAL_PLAYER1_X, INITIAL_PLAYER1_Y);
    this.player2 = new Player(this, INITIAL_PLAYER2_X, INITIAL_PLAYER2_Y);
    this.ball = new Ball(this, "red");
    this.scorePlayer1 = new Scores(this, 250, 100, 0);
    this.scorePlayer2 = new Scores(this, 600, 100, 0);
  }
  //creating a 'event listener' that will move the player when we push the keys.
  enableControls() {
    window.addEventListener("keydown", (event) => {
      //console.log(event.code);
      switch (event.code) {
        case "KeyW":
          this.player.movingUp = true;
          break;
        case "KeyS":
          this.player.movingDown = true;
          break;

        case "ArrowUp":
          this.player2.movingUp = true;
          break;
        case "ArrowDown":
          this.player2.movingDown = true;
          break;
      }
    });
    // creating an 'event listener' that will stop moving the player when we lift the finger of the key.
    window.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "KeyW":
          this.player.movingUp = false;
          break;
        case "KeyS":
          this.player.movingDown = false;
          break;

        case "ArrowUp":
          this.player2.movingUp = false;
          break;
        case "ArrowDown":
          this.player2.movingDown = false;
          break;
      }
    });
  }

  //adding one score to the player
  addScores() {
    //this addes scores to player1
    if (this.ball.x < 0) {
      this.scorePlayer2.value += 1;
      this.ball.x = 450;
      this.ball.y = 300;
      //console.log(this.ball.x);
    }
    //this addes scores to player2
    if (this.ball.x > 900) {
      this.scorePlayer1.value += 1;
      this.ball.x = 450;
      this.ball.y = 300;
      //console.log(this.ball.x);
    }
  }
  endTheGame() {
    if (this.scorePlayer1.value > 9 || this.scorePlayer2.value > 9) {
      this.lose();
    }
  }
  //running the 'runLogic' methods of the players (and posibly of the ball as well)
  runLogic() {
    this.player.runLogic();
    this.player2.runLogic();
    this.ball.runLogic();
    this.scorePlayer1.runLogic();
    this.scorePlayer2.runLogic();
  }
  //calling the 'draw' method of each object in the canvas.
  draw() {
    this.context.clearRect(0, 0, 900, 600);
    this.player.draw();
    this.player2.draw();
    this.ball.draw();

    this.scorePlayer1.draw();
    this.scorePlayer2.draw();
  }

  lose() {
    this.gameScreenElement.style.display = "none";
    this.gameOverScreenElement.style.display = "";
    clearInterval(this.intervalId);
  }

  start() {
    this.reset();
    this.intervalId = setInterval(() => {
      this.loop();
    }, 1000 / 60);
  }
  loop() {
    this.runLogic();
    this.draw();
    this.addScores();
    this.endTheGame();
  }
}
