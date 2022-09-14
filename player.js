class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = PLAYER_PADDLE_WIDTH;
    this.height = PLAYER_PADDLE_HEIGHT;
    this.movingUp = false;
    this.movingDown = false;
    this.speedY = PLAYER_MOVE_SPEED;
  }

  runLogic() {
    if (this.y < 0) {
      //console.log("ups");
      this.movingUp = false;
    }

    if (this.y > SCREEN_HEIGHT - PLAYER_PADDLE_HEIGHT) {
      this.movingDown = false;
    }

    if (this.movingUp) {
      this.speedY = PLAYER_MOVE_SPEED;
      this.y -= this.speedY;
    } else if (!this.movingUp) {
      this.speedY = 0;
    }

    if (this.movingDown) {
      this.speedY = PLAYER_MOVE_SPEED;
      this.y += this.speedY;
    } else if (!this.movingDown) {
      this.speedY = 0;
    }
  }

  draw() {
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.fillStyle = "yellow";

    //this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
