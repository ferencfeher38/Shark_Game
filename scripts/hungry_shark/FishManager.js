class FishManager extends Phaser.Scene {
    fishAssets = ["yellowfish", "redfish", "bluefish", "greenfish", "orangefish", "pinkfish", "cblackfish", "cbluefish", "cgreenfish", "cpurplefish", "credfish", "cyellowfish"]
    fishTypes = ["yellowfishanim", "redfishanim", "bluefishanim", "greenfishanim", "orangefishanim", "pinkfishanim", "cblackfishanim", "cbluefishanim", "cgreenfishanim", "cpurplefishanim", "credfishanim", "cyellowfishanim"];
    fishArray = [];
    fishSize = [];

    sharkSize = 1;
    sharkXP = 0;

    constructor() {
        super("fishManager");
    }

    init(shark){
        this.shark = shark;
    }

    create(){
        for (let i = 0; i < this.fishTypes.length; i++){
            this.anims.create({
                key: this.fishTypes[i],
                frames: this.anims.generateFrameNumbers(this.fishAssets[i]),
                frameRate: 10,
                repeat: -1
            });
        }

        this.scale.on('resize', this.resize, this);

        this.spawnFish(8);
    }

    update() {
        for(let i = 0; i < this.fishArray.length; i++) {
            if (this.fishArray[i].body){
                this.fishArray[i].flipX = this.fishArray[i].body.velocity.x > 0;
            }
        }
    }

    collideFish(fish1, fish2){
        if(this.fishSize[this.fishArray.indexOf(fish1)] > this.fishSize[this.fishArray.indexOf(fish2)]){
            fish2.destroy();
            this.fishSize[this.fishArray.indexOf(fish1)] += 2;
            if (this.fishArray[this.fishArray.indexOf(fish1)].scale < 0.5){
                this.fishArray[this.fishArray.indexOf(fish1)].setScale(this.fishSize[this.fishArray.indexOf(fish1)]*0.02 + 0.15);
            }
            this.spawnFish(1);
        } else if (this.fishSize[this.fishArray.indexOf(fish1)] < this.fishSize[this.fishArray.indexOf(fish2)]){
            fish1.destroy();
            this.fishSize[this.fishArray.indexOf(fish2)] += 2;
            if (this.fishArray[this.fishArray.indexOf(fish2)].scale < 0.5){
                this.fishArray[this.fishArray.indexOf(fish2)].setScale(this.fishSize[this.fishArray.indexOf(fish2)]*0.02 + 0.15);
            }
            this.spawnFish(1);
        }
    }

    removeFish(shark, fish) {
        if (this.sharkSize > this.fishSize[this.fishArray.indexOf(fish)]){
            hunger-= 20;
            if(hunger < 0){
                hunger = 0;
            }
            fish.destroy();
            this.eat_fish();
            this.spawnFish(1);
            score += 10 + 10 * this.fishSize[this.fishArray.indexOf(fish)];

        } else if(this.sharkSize < this.fishSize[this.fishArray.indexOf(fish)]){
            if(immunity <= 0){
                hunger += 1;
                if (hunger > 100){
                    hunger = 100;
                }
            } else {
                immunity--;
            }
            
        }
    }

    eat_fish(){
        this.sharkXP += 1
        if(this.sharkXP == 3 && this.shark.scale <= 0.5){
            this.shark.setScale(this.shark.scale += 0.02);
            this.sharkSize += 2;
            this.sharkXP = 0;
        }
    }

    spawnFish(count) {
        for(let i = 0; i < count; i++){
            var x = Math.floor(Math.random() * this.fishTypes.length);
            let fish = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight / 2, this.fishTypes[x]);
            fish.setRandomPosition(0, 0, window.innerWidth, window.innerHeight);

            var nextSize = Math.random();
            if(nextSize <= 0.8){
                nextSize = this.sharkSize - 1;
                this.fishSize.push(nextSize);
            } else {
                nextSize = this.sharkSize + 1;
                this.fishSize.push(nextSize);
            }
            nextSize = (0.15 + (nextSize * 0.02));
            if(nextSize >= 0.5) {nextSize = 0.5};
            fish.setScale(nextSize);

            if(this.fishTypes[x].startsWith("c")) {
                fish.setBodySize(498, 327);
            } else {
                fish.setBodySize(418, 397);
            }
            fish.body.offset.x = 0;
            fish.body.offset.y = 0;
            fish.setCollideWorldBounds(true);
            fish.setBounce(1);
            if (Math.random() > 0.5){
                fish.setVelocity(100, 100);
                fish.x = 0;
            } else {
                fish.setVelocity(-100, -100);
                fish.x = window.innerWidth;
            }
            fish.play(this.fishTypes[x]);
            this.physics.add.overlap(this.shark, fish, this.removeFish, null, this);
            for(let j = 0; j < this.fishArray.length; j++){
                this.physics.add.overlap(fish, this.fishArray[j], this.collideFish, null, this);
            }
            this.fishArray.push(fish);
        }
    }

    resize(gameSize) {
        this.physics.world.setBounds(0, 0, gameSize.width, gameSize.height, true, true, true, true);
    }

}