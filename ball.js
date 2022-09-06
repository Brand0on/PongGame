class Ball {
  constructor(game) {
    this.game = game;
    this.x = 450;
    this.y = 300;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    this.game.context.beginPath();
    this.game.context.arc(450, 300, 15, 0, Math.PI * 2);
    this.game.context.fill();

    //this.context.fillRect(this.x, this.y, this.width, this.height);
  }
}
