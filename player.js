class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 12;
    this.height = 130;
    this.movingUp = false;
    this.movingDown = false;
    this.speedY = 10;
  }

  runLogic() {
    if (this.y < 0) {
      //console.log("ups");
      this.movingUp = false;
    }

    if (this.y > 470) {
      this.movingDown = false;
    }

    if (this.movingUp) {
      this.speedY = 10;
      this.y -= this.speedY;
    } else if (!this.movingUp) {
      this.speedY = 0;
    }

    if (this.movingDown) {
      this.speedY = 10;
      this.y += this.speedY;
    } else if (!this.movingDown) {
      this.speedY = 0;
    }
  }

  draw() {
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    //this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
