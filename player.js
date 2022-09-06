class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 12;
    this.height = 130;
  }
  draw() {
    this.game.context.fillRect(this.x, this.y, this.width, this.height);
    //this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
