class Ball {
  constructor(game, color) {
    this.game = game;
    //starting position of the ball
    this.x = 450;
    this.y = 300;
    //size of the ball
    this.width = 50;
    this.height = 50;

    //making a random direction when the ball starts moving
    this.direction = {
      x: Math.random() - 0.5 >= 0 ? -8 : 8,
      y: Math.random() - 0.5 >= 0 ? -8 : 8,
    };
  }

  runLogic() {
    //console.log("aaa");
    //making the ball to move
    this.x = this.x + this.direction.x;
    this.y = this.y + this.direction.y;
    //making the ball bouncing in the top and the bottom of the canvas

    this.bottomSide = this.y + this.direction.y + 12;
    this.topSide = this.y + this.direction.y - 12;
    this.rigthSide = this.x + this.direction.x + 38;
    this.leftSide = this.x + this.direction.x - 38;
    if (this.topSide === 0 || this.bottomSide === 600) {
      this.direction.y = -this.direction.y;
    }

    /*if (this.leftSide === 0 || this.rigthSide === 900) {
      this.direction.x = -this.direction.x;
    }*/

    if (
      //making the ball bounce when reaches the paddle vertical line
      this.x <= this.game.player.x + 25 &&
      //making the ball bounce when reaches the top side of the paddle
      this.y >= this.game.player.y &&
      //makeing the ball bounce when it reaches the bottom side of the paddle
      this.y <= this.game.player.y + this.game.player.height
    ) {
      this.direction.x = -this.direction.x;
    }

    if (
      //making the ball bounce when reaches the paddle vertical line
      this.x >= this.game.player2.x - 14 &&
      //making the ball bounce when reaches the top side of the paddle
      this.y >= this.game.player2.y &&
      //makeing the ball bounce when it reaches the bottom side of the paddle
      this.y <= this.game.player2.y + this.game.player2.height
    ) {
      this.direction.x = -this.direction.x;
    }

    if (
      this.x > this.game.player2.x &&
      this.x < this.game.player2.x + this.game.player2.width &&
      this.y === this.game.player2.y
    ) {
      this.direction.x = -this.direction.x;
    }
  }
  //console.log(this.game.player.y);

  draw() {
    //drawing the ball
    this.game.context.beginPath();
    this.game.context.arc(this.x, this.y, 15, 0, Math.PI * 2);
    this.game.context.fill();

    //this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
