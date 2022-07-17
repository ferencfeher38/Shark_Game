let graphics;
let hungerBarWidth = window.innerWidth;
let hungerBarStartY = window.innerHeight - 25;

class GameScene extends Phaser.Scene {
    constructor() {
        super("gameScene");
    }

    init(data){
        this.map = data.map;
        userName = data.userName;
    }

    create(){
        this.background = this.add.image(0, 0, this.map);
        this.background.setOrigin(0,0);

        const text = this.add.text(0, 0, `Player: ${userName}`, { font: "30px Arial Black", fill: "#000" });
        text.setStroke('#fff', 0.5);
        text.setShadow(1, 1, "#333333", 0.5, true, true);

        this.scoreText = this.add.text(0, 30,'Score: 0', { font: "30px Arial Black", fill: "#000" });
        this.scoreText.setStroke('#fff', 0.5);
        this.scoreText.setShadow(1, 1, "#333333", 0.5, true, true);

        this.shark = this.physics.add.image(mouse.x, mouse.y, "shark");
        this.shark.setScale(0.1);
        this.shark.setCollideWorldBounds(true);

        this.scene.launch("playerManager",this.shark);
        this.scene.launch("bonusManager",this.shark);
        this.scene.launch("fishManager",this.shark);

        this.scale.on('resize', this.resize, this);

        graphics = this.add.graphics();
        let color = 0xff0000;
        let thickness = 2;
        let alpha = 1;

        graphics.lineStyle(thickness, color, alpha);
        this.label = this.add.text(hungerBarWidth/2, hungerBarStartY, 'Hunger', { font: "20px Arial Black", fill: "#000" });
    }

    update(){
        graphics.clear();
        graphics.fillStyle(0xff0000, 1);

        graphics.strokeRect(0, hungerBarStartY, hungerBarWidth, 25);
        graphics.fillRect(0 ,hungerBarStartY, hungerBarWidth * (hunger / 100), 25);
        hunger += 0.05;
        if (hunger > 100){
            hunger = 100;
        }
        this.scoreText.destroy();
        this.scoreText = this.add.text(0, 30,'Score: ' + score, { font: "30px Arial Black", fill: "#000" });
        this.scoreText.setStroke('#fff', 0.5);
        this.scoreText.setShadow(1, 1, "#333333", 0.5, true, true);
    }

    resize(gameSize) {
        hungerBarWidth = window.innerWidth;
        hungerBarStartY = window.innerHeight - 25;
        this.label.destroy();
        this.label = this.add.text(hungerBarWidth / 2, hungerBarStartY, 'Hunger', { font: "20px Arial Black", fill: "#000" });
        this.physics.world.setBounds(0, 0, gameSize.width, gameSize.height, true, true, true, true);
        this.background.setScale(
            window.innerWidth / this.background.width,
            window.innerHeight / this.background.height
        );
    }

}