class LoadScene extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.image("shark", "../assets/fish/shark.png");
        this.load.image("shield", "../assets/bonuses/Shield.png");
        this.load.image("heart", "../assets/bonuses/Heart.png");
        this.load.image("bomb", "../assets/bonuses/Bomb.png");
        this.load.image("map1", "../assets/backgrounds/1_game_background.png");
        this.load.image("map2", "../assets/backgrounds/2_game_background.png");
        this.load.image("map3", "../assets/backgrounds/3_game_background.png");
        this.load.image("map4", "../assets/backgrounds/4_game_background.png");
        this.load.image("background", "../assets/backgrounds/1_game_background.png");

        this.load.spritesheet("yellowfish", "../assets/fish/__yellow_cartoon_fish_01_swim.png", { frameWidth: 418, frameHeight: 397 });
        this.load.spritesheet("redfish", "../assets/fish/__red_cartoon_fish_01_swim.png", { frameWidth: 418, frameHeight: 397 });
        this.load.spritesheet("bluefish", "../assets/fish/__blue_cartoon_fish_swim.png", { frameWidth: 418, frameHeight: 397 });
        this.load.spritesheet("greenfish", "../assets/fish/__green_cartoon_fish_01_swim.png", { frameWidth: 418, frameHeight: 397 });
        this.load.spritesheet("orangefish", "../assets/fish/__orange_cartoon_fish_01_swim.png", { frameWidth: 418, frameHeight: 397 });
        this.load.spritesheet("pinkfish", "../assets/fish/__pink_cartoon_fish_01_swim.png", { frameWidth: 418, frameHeight: 397 });

        this.load.spritesheet("cblackfish", "../assets/fish/__cartoon_fish_06_black_swim.png", { frameWidth: 498, frameHeight: 327 });
        this.load.spritesheet("cbluefish", "../assets/fish/__cartoon_fish_06_blue_swim.png", { frameWidth: 498, frameHeight: 327 });
        this.load.spritesheet("cgreenfish", "../assets/fish/__cartoon_fish_06_green_swim.png", { frameWidth: 498, frameHeight: 327 });
        this.load.spritesheet("cpurplefish", "../assets/fish/__cartoon_fish_06_purple_swim.png", { frameWidth: 498, frameHeight: 327 });
        this.load.spritesheet("credfish", "../assets/fish/__cartoon_fish_06_red_swim.png", { frameWidth: 498, frameHeight: 327 });
        this.load.spritesheet("cyellowfish", "../assets/fish/__cartoon_fish_06_yellow_swim.png", { frameWidth: 498, frameHeight: 327 });
    }
    
    create(){
        this.add.text(20, 20, "Load Game...");
        this.scene.start("menuScene");
    }
}