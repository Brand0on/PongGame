const INITIAL_PLAYER1_X = 15;
const INITIAL_PLAYER1_Y = 235;

const INITIAL_PLAYER2_X = 874;
const INITIAL_PLAYER2_Y = 235;

class Game {
  constructor() {
    //ubicating the canvas element from the HTML document
    this.canvasElement = document.querySelector("canvas");
    //getting the access to the canvas content
    this.context = this.canvasElement.getContext("2d");

    this.enableControls();

    //creating new objects from the classes created
    this.player = new Player(this, INITIAL_PLAYER1_X, INITIAL_PLAYER1_Y);
    this.player2 = new Player(this, INITIAL_PLAYER2_X, INITIAL_PLAYER2_Y);
    this.ball = new Ball(this);
    this.player.keyW = false;
    this.player.keyS = false;
    this.player2.arrowUp = false;
    this.player2.arrowDown = false;
  }

  //making the paddles to move
  enableControls() {
    window.addEventListener("keydown", (event) => {
      switch (event.code) {
        //for the player in the left
        case "KeyW":
          this.player.y -= 10;
          this.player.keyW = true;
          console.log(this);
          break;
        case "KeyS":
          this.player.y += 10;
          this.player.keyS = true;
          break;

        //for the player in the right
        case "ArrowUp":
          this.player2.y -= 10;
          this.player2.arrowUp = true;
          break;
        case "ArrowDown":
          this.player2.y += 10;
          this.player2.arrowDown = true;
          break;

        /*case "ArrowRight":
            this.player.x += 5;
            break;
          case "ArrowLeft":
            this.player.x -= 5;
            break;*/
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.code) {
        case "KeyW":
          delete this.player.keyW;
          console.log(this);
          break;
        case "KeyS":
          delete this.player.keyS;
          break;

        //for the player in the right
        case "ArrowUp":
          delete this.player2.arrowUp;
          break;
        case "ArrowDown":
          delete this.player2.arrowDown;
          break;
      }

      if (
        (this.player.keyW && event.code === "ArrowUp") ||
        (this.player2.arrowUp && event.code === "KeyW")
      ) {
        this.player.y -= 10;
        this.player2.y -= 10;
        console.log("W + UP WERE PRESSED");
      }
    });
  }

  runLogic() {}

  draw() {
    this.context.clearRect(0, 0, 900, 600);
    this.player.draw();
    this.player2.draw();
    this.ball.draw();
  }

  loop() {
    setInterval(() => {
      this.runLogic();
      this.draw();
    }, 1000 / 120);
  }
}
