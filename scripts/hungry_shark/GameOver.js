class GameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  preload() {
    this.load.image("menuFrame2", "../assets/gui/menu_frame_2.png");
    this.load.image("button", "../assets/gui/text_field.png");
  }

  init(data){
    this.name = data.name;
    this.score = data.score;
  }

  create() {
    this.screenCenterX = this.game.renderer.width / 2;
    this.screenCenterY = this.game.renderer.height / 2;
    this.menuFrame = this.physics.add.image(this.screenCenterX, this.screenCenterY, "menuFrame2").setDepth(0);
    this.menuFrame.setScale(0.3);

    this.text = this.add.text(this.menuFrame.x - 105, this.menuFrame.y - 155, "Score: " + score, { font: "40px Arial Black", fill: "#000" });
    this.text.setStroke('#fff', 0.5);
    this.text.setShadow(1, 1, "#333333", 0.5, true, true);

    this.button1 = this.physics.add.image(this.menuFrame.x, this.menuFrame.y - 50, "button");
    this.button1.setScale(0.11);
    this.button1.setInteractive({ cursor: 'pointer' });
    this.button1.on("pointerup", () => {
      window.location.replace("../pages/hungry_shark.html");
    })

    this.button1text = this.add.text(this.menuFrame.x - 90, this.menuFrame.y - 70, "New Game", { font: "30px Arial Black", fill: "#ffffff" });
    this.button1text.setStroke('#fff', 0.5);
    this.button1text.setShadow(1, 1, "#333333", 0.5, true, true);

    this.button2 = this.physics.add.image(this.menuFrame.x, this.menuFrame.y + 40, "button");
    this.button2.setScale(0.11);
    this.button2.setInteractive({ cursor: 'pointer' });
    this.button2.on("pointerup", () => {
      window.sessionStorage.setItem('name', userName);
      window.sessionStorage.setItem('score', score);
      window.location.replace("../pages/leaderboard.html");
    })

    this.button2text = this.add.text(this.menuFrame.x - 105, this.menuFrame.y + 20, "Leaderboard", { font: "30px Arial Black", fill: "#ffffff" });
    this.button2text.setStroke('#fff', 0.5);
    this.button2text.setShadow(1, 1, "#333333", 0.5, true, true);

    this.backButtonText = this.add.text(this.menuFrame.x - 110, this.menuFrame.y + 145, "Back To Main", { font: "30px Arial Black", fill: "#ffffff" }).setDepth(1);
    this.backButtonText.setStroke('#fff', 0.5);
    this.backButtonText.setShadow(1, 1, "#333333", 0.5, true, true);

    this.backButton = this.physics.add.image(this.menuFrame.x, this.menuFrame.y + 165, "button");
    this.backButton.setScale(0.11);
    this.backButton.setInteractive({ cursor: 'pointer' });
    this.backButton.on("pointerup", () => {
      window.location.replace("../index.html");
    })
  }
  
  update() {
    this.resize();
  }

  resize() {
    this.menuFrame.x = this.game.renderer.width / 2;
    this.menuFrame.y = this.game.renderer.height / 2;

    this.text.x = this.menuFrame.x - 105;
    this.text.y = this.menuFrame.y - 145;

    this.button1.x = this.menuFrame.x;
    this.button1.y = this.menuFrame.y - 50;

    this.button1text.x = this.menuFrame.x - 90;
    this.button1text.y = this.menuFrame.y - 70;

    this.button2.x = this.menuFrame.x;
    this.button2.y = this.menuFrame.y + 40;

    this.button2text.x = this.menuFrame.x - 105;
    this.button2text.y = this.menuFrame.y + 20;

    this.backButton.x = this.menuFrame.x;
    this.backButton.y = this.menuFrame.y + 165;

    this.backButtonText.x = this.menuFrame.x - 110;
    this.backButtonText.y = this.menuFrame.y + 145;
  }
}
  