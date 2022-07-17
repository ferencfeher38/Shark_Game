class MenuScene extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }
  preload() {
    this.load.html('nameInput', '../assets/text/nameInput.html');
    this.load.image("menuFrame", "../assets/gui/menu_frame.png");
    this.load.image("mapFrame", "../assets/gui/menu_frame_2_empty_body.png");
    this.load.image("leftArrow", "../assets/gui/left.png");
    this.load.image("rightArrow", "../assets/gui/right.png");
    this.load.image("playButton", "../assets/gui/play.png");
    this.load.image("textField", "../assets/gui/text_field.png");
    this.maps = ['map1', 'map2', 'map3', 'map4'];
    this.counter = 0;
  }
  create() {
    this.background = this.add.image(0, 0, "map1");
    this.background.setOrigin(0, 0);
    
    this.screenCenterX = this.game.renderer.width / 2;
    this.screenCenterY = this.game.renderer.height / 2;
    this.menuFrame = this.physics.add.image(this.screenCenterX, this.screenCenterY, "menuFrame").setDepth(0);
    this.menuFrame.setScale(0.3);

    this.textField = this.physics.add.image(this.menuFrame.x + 50, this.menuFrame.y - 175, "textField");
    this.textField.setScale(0.08);

    this.mapPreview = this.physics.add.image(this.menuFrame.x, this.menuFrame.y - 15, "map1");
    this.mapPreview.setScale(0.15);

    this.mapFrame = this.physics.add.image(this.menuFrame.x, this.menuFrame.y - 15, "mapFrame").setDepth(1);
    this.mapFrame.setScale(0.15);

    this.leftArrow = this.physics.add.image(this.menuFrame.x - 100, this.menuFrame.y + 115, "leftArrow").setDepth(1);
    this.leftArrow.setScale(0.1);

    this.rightArrow = this.physics.add.image(this.menuFrame.x + 100, this.menuFrame.y + 115, "rightArrow").setDepth(1);
    this.rightArrow.setScale(0.1);

    this.playButton = this.physics.add.image(this.menuFrame.x, this.menuFrame.y + 130, "playButton").setDepth(1);
    this.playButton.setScale(0.15);

    this.text = this.add.text(this.menuFrame.x - 165, this.menuFrame.y - 195, "Name:", { font: "30px Arial Black", fill: "#000" });
    this.text.setStroke('#fff', 0.5);
    this.text.setShadow(1, 1, "#333333", 0.5, true, true);

    this.textField.setInteractive({ cursor: 'text' });

    this.playButton.setInteractive({ cursor: 'pointer' });
    this.playButton.on("pointerup", () => {
      this.startGame();
    })

    this.leftArrow.setInteractive({ cursor: 'pointer' });
    this.leftArrow.on("pointerup", () => {
      this.previousMap();
    })

    this.rightArrow.setInteractive({ cursor: 'pointer' });
    this.rightArrow.on("pointerup", () => {
      this.nextMap();
    })

    this.userNameInput = this.add.dom(this.menuFrame.x + 50, this.menuFrame.y - 175).createFromCache('nameInput');

    this.backButtonText = this.add.text(this.menuFrame.x - 27.5, this.menuFrame.y + 247.5, "Back", { font: "20px Arial Black", fill: "#ffffff" }).setDepth(1);
    this.backButtonText.setStroke('#fff', 0.5);
    this.backButtonText.setShadow(1, 1, "#333333", 0.5, true, true);

    this.backButton = this.physics.add.image(this.menuFrame.x, this.menuFrame.y + 260, "textField");
    this.backButton.setScale(0.05, 0.08);
    this.backButton.setInteractive({ cursor: 'pointer' });
    this.backButton.on("pointerup", () => {
      window.location.replace("../index.html");
    })
  }

  startGame(){
    const inputUsername = document.getElementById('username');
    if(inputUsername.value === ''){
      alert("Please enter username!");
    }else{
      this.background.destroy();
      this.menuFrame.destroy();
      this.textField.destroy();
      this.mapPreview.destroy();
      this.mapFrame.destroy();
      this.leftArrow.destroy();
      this.rightArrow.destroy();
      this.playButton.destroy();
      this.userNameInput.destroy();
      this.add.text(20, 20, "Load Game...");
      this.scene.start("gameScene", {map: this.maps[this.counter], userName: inputUsername.value});
    }
    
  }

  nextMap(){
    console.log('kill image');
    this.mapPreview.destroy();
    this.counter++;
    if(this.counter >= 4)
      this.counter = 0
    this.mapPreview = this.physics.add.image(this.menuFrame.x, this.menuFrame.y - 15, this.maps[this.counter]).setDepth(0);
    this.mapPreview.setScale(0.15);
    console.log(this.counter);
  }

  previousMap(){
    console.log('kill image');
    this.mapPreview.destroy();
    this.counter--;
    if(this.counter < 0)
      this.counter = 3
    this.mapPreview = this.physics.add.image(this.menuFrame.x, this.menuFrame.y - 15, this.maps[this.counter]).setDepth(0);
    this.mapPreview.setScale(0.15);
    console.log(this.counter);
  }

  update() {
    this.resize();
  }

  resize() {
    this.background.setScale(
      window.innerWidth / this.background.width,
      window.innerHeight / this.background.height
    );

    this.menuFrame.x = this.game.renderer.width / 2;
    this.menuFrame.y = this.game.renderer.height / 2;

    this.textField.x = this.menuFrame.x + 50;
    this.textField.y = this.menuFrame.y - 175;

    this.mapPreview.x = this.menuFrame.x;
    this.mapPreview.y = this.menuFrame.y - 15;
    
    this.mapFrame.x = this.menuFrame.x;
    this.mapFrame.y = this.menuFrame.y - 15;

    this.leftArrow.x = this.menuFrame.x - 100;
    this.leftArrow.y = this.menuFrame.y + 115;

    this.rightArrow.x = this.menuFrame.x + 100;
    this.rightArrow.y = this.menuFrame.y + 115;

    this.playButton.x = this.menuFrame.x;
    this.playButton.y = this.menuFrame.y + 130;

    this.text.x = this.menuFrame.x - 165;
    this.text.y = this.menuFrame.y - 195;

    this.userNameInput.x = this.menuFrame.x + 50;
    this.userNameInput.y = this.menuFrame.y - 175;

    this.backButton.x = this.menuFrame.x;
    this.backButton.y = this.menuFrame.y + 260;
    this.backButtonText.x = this.menuFrame.x - 27.5;
    this.backButtonText.y = this.menuFrame.y + 247.5;
  }
}
