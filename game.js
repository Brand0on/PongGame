const INITIAL_PLAYER1_X = PLAYER_PADDING_FROM_EDGE;
const INITIAL_PLAYER1_Y = (SCREEN_HEIGHT - PLAYER_PADDLE_HEIGHT) / 2;
//this are the positions of the players at the beginning of the game.
const INITIAL_PLAYER2_X =
  SCREEN_WIDTH - PLAYER_PADDING_FROM_EDGE - PLAYER_PADDLE_WIDTH;
const INITIAL_PLAYER2_Y = (SCREEN_HEIGHT - PLAYER_PADDLE_HEIGHT) / 2;

const SCORE_POSITION_PLAYER_1 = SCREEN_WIDTH / 3 - SCORES_SIZE / 2;
const SCORE_POSITION_PLAYER_2 = (SCREEN_WIDTH / 3) * 2 - SCORES_SIZE / 2;

const BALL_START_X = SCREEN_WIDTH / 2;
const BALL_START_Y = SCREEN_HEIGHT / 2;

class Game {
  constructor(gameScreenElement, gameOverScreenElement) {
    this.gameScreenElement = gameScreenElement;
    this.gameOverScreenElement = gameOverScreenElement;
    this.canvasElement = document.querySelector("canvas");
    this.context = this.canvasElement.getContext("2d");

    this.enableControls();
    this.reset();
    this.image = new Image();
    this.image.src = "photos/pong_background.png";
  }

  reset() {
    this.player = new Player(this, INITIAL_PLAYER1_X, INITIAL_PLAYER1_Y);
    this.player2 = new Player(this, INITIAL_PLAYER2_X, INITIAL_PLAYER2_Y);
    this.balls = [];
    this.addBall("red");
    //this.addBall("green");
    this.scorePlayer1 = new Scores(
      this,
      SCORE_POSITION_PLAYER_1,
      SCORES_PADDING_FROM_TOP,
      0
    );
    this.scorePlayer2 = new Scores(
      this,
      SCORE_POSITION_PLAYER_2,
      SCORES_PADDING_FROM_TOP,
      0
    );
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
  explotion() {
    for (let i = 0; i < this.balls.length; i++) {
      let ball = this.balls[i];
      if (ball.contador > 3) {
        this.addBall("blue");
        EXPLOSION_SOUND.play();

        ball.contador = 0;
      }
    }
  }

  addBall(color) {
    this.balls.push(new Ball(this, color));
  }

  //adding one score to the player
  addScores() {
    //adding scores to player2
    for (var i = 0; i < this.balls.length; i++) {
      var ball = this.balls[i];
      if (ball.x < 0) {
        this.scorePlayer2.value += 1;
        ball.x = BALL_START_X;
        ball.y = BALL_START_Y;
        ball.contador = 0;
        //console.log(ball.x);
      }
      //adding scores to player1
      if (ball.x > SCREEN_WIDTH) {
        this.scorePlayer1.value += 1;
        ball.x = BALL_START_X;
        ball.y = BALL_START_Y;
        ball.contador = 0;
        //console.log(ball.x);
      }
    }
  }
  endTheGame() {
    if (
      this.scorePlayer1.value > SCORES_MAX ||
      this.scorePlayer2.value > SCORES_MAX
    ) {
      this.lose();
    }
  }
  //running the 'runLogic' methods of the players (and posibly of the ball as well)
  runLogic() {
    this.player.runLogic();
    this.player2.runLogic();
    for (var i = 0; i < this.balls.length; i++) {
      var ball = this.balls[i];
      ball.runLogic();
    }
    this.scorePlayer1.runLogic();
    this.scorePlayer2.runLogic();
  }
  //calling the 'draw' method of each object in the canvas.
  draw() {
    this.context.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.context.drawImage(this.image, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    this.player.draw();
    this.player2.draw();
    for (var i = 0; i < this.balls.length; i++) {
      var ball = this.balls[i];
      ball.draw();
    }

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
    this.explotion();
  }
}
