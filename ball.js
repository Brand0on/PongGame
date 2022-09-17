class Ball {
  constructor(game, color) {
    this.game = game;
    this.color = color;
    this.image = new Image();
    this.image.src = "photos/bomba.png";
    //starting position of the ball
    this.x = SCREEN_WIDTH / 2;
    this.y = SCREEN_HEIGHT / 2;
    //size of the ball
    // this.width = 50;
    // this.height = 50;

    //making a random direction when the ball starts moving
    this.direction = {
      x: Math.random() - 0.5 >= 0 ? -BALL_SPEED : BALL_SPEED,
      y: Math.random() - 0.5 >= 0 ? -BALL_SPEED : BALL_SPEED,
    };
    this.contador = 0;
  }

  runLogic() {
    //console.log("aaa");
    //making the ball to move
    this.x = this.x + this.direction.x;
    this.y = this.y + this.direction.y;
    //making the ball bouncing in the top and the bottom of the canvas

    this.bottomSide = this.y + BALL_RADIUS;
    this.topSide = this.y - BALL_RADIUS;
    this.rigthSide = this.x + BALL_RADIUS;
    this.leftSide = this.x - BALL_RADIUS;
    if (this.topSide <= 0 || this.bottomSide >= SCREEN_HEIGHT) {
      this.direction.y = -this.direction.y;
    }

    if (
      //making the ball bounce when reaches the paddle vertical line
      this.x <= this.game.player.x + PLAYER_PADDLE_WIDTH + BALL_RADIUS &&
      //making sure the ball is not already behind the paddle
      this.x >
        this.game.player.x + PLAYER_PADDLE_WIDTH + BALL_RADIUS - BALL_SPEED &&
      //making the ball bounce when reaches the top side of the paddle
      this.y >= this.game.player.y - BALL_RADIUS &&
      //makeing the ball bounce when it reaches the bottom side of the paddle
      this.y <= this.game.player.y + this.game.player.height + BALL_RADIUS
    ) {
      this.direction.x = -this.direction.x;
      this.contador += 1;
      BOUNCE_SOUND.play();
    }

    if (
      //making the ball bounce when reaches the paddle vertical line
      this.x >= this.game.player2.x - BALL_RADIUS &&
      //making sure the ball is not already behind the paddle
      this.x < this.game.player2.x - BALL_RADIUS + BALL_SPEED &&
      //making the ball bounce when reaches the top side of the paddle
      this.y >= this.game.player2.y - BALL_RADIUS &&
      //makeing the ball bounce when it reaches the bottom side of the paddle
      this.y <= this.game.player2.y + this.game.player2.height + BALL_RADIUS
    ) {
      this.direction.x = -this.direction.x;
      this.contador += 1;
      BOUNCE_SOUND.play();
    }

    // if (
    //   this.x > this.game.player2.x &&
    //   this.x < this.game.player2.x + this.game.player2.width &&
    //   this.y === this.game.player2.y
    // ) {
    //   this.direction.x = -this.direction.x;
    // }
  }
  //console.log(this.game.player.y);

  draw() {
    //drawing the ball
    //this.game.context.beginPath();
    //this.game.context.arc(this.x, this.y, BALL_RADIUS, 0, Math.PI * 2);
    //const oldFillStyle = this.game.context.fillStyle;
    //this.game.context.fillStyle = this.color;
    //this.game.context.fill();
    //this.game.context.fillStyle = oldFillStyle;

    //this.context.fillRect(this.x, this.y, this.width, this.height);

    this.game.context.drawImage(
      this.image,
      this.x - BOMB_RADIUS / 2,
      this.y - BOMB_RADIUS / 2,
      BOMB_RADIUS,
      BOMB_RADIUS
    );
  }
}
