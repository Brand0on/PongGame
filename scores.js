class Scores {
  constructor(game, x, y, value) {
    this.game = game;
    this.x = x;
    this.y = y;
    // this.width = 100;
    // this.height = 50;
    this.value = value;
  }

  runLogic() {
    /*if (this.game.ball.x > SCREEN_WIDTH) {
      this.value += 1;
    }*/
  }

  draw() {
    //this.game.context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.font = "" + SCORES_SIZE + "px monospace";
    this.game.context.fillText(this.value, this.x, this.y);
  }
}
