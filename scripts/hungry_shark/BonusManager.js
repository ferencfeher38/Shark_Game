class BonusManager extends Phaser.Scene {
    constructor() {
        super("bonusManager");
    }

    init(shark) {
        this.shark = shark;
        this.bonusesWithRoundLeft = [];
        this.bonusInterval = setInterval(this.displayBonuses.bind(this), 5000);
    }

    create() {
        this.scale.on('resize', this.resize, this);
    }

    destroyBonusWithNoRoundLeft() {
        let bonusToDestroy;
        for (let index = 0; index < this.bonusesWithRoundLeft.length; index++) {
            this.bonusesWithRoundLeft[index].roundLeft--;
            if (this.bonusesWithRoundLeft[index].roundLeft == 0) {
                bonusToDestroy = this.bonusesWithRoundLeft[index].bonus;
            }
        }
        this.destroyBonus(bonusToDestroy);
    }

    generateBonus() {
        let bonuses = ["bomb", "heart", "shield"];
        let bonusId = Math.floor(Math.random() * bonuses.length);
        let bonusX = Math.floor(Math.random() * window.innerWidth);
        let bonusY = Math.floor(Math.random() * window.innerHeight);

        let bonus = this.physics.add.image(bonusX, bonusY, bonuses[bonusId])
            .setScale(0.2)
            .setCollideWorldBounds(true);

        this.physics.add.overlap(this.shark, bonus, this.pickUpBonus, null, this);

        return bonus;
    }

    displayBonuses() {
        this.destroyBonusWithNoRoundLeft();
        let bonus = this.generateBonus();
        let bonusWithCallLeft = {bonus: bonus, roundLeft: 5};
        this.bonusesWithRoundLeft.push(bonusWithCallLeft);
    }

    destroyBonus(bonus) {
        for (let index = 0; index < this.bonusesWithRoundLeft.length; index++) {
            if (this.bonusesWithRoundLeft[index].bonus === bonus) {
                this.bonusesWithRoundLeft[index].bonus.destroy();
                this.bonusesWithRoundLeft.splice(index, 1);
                return;
            }
        }
    }

    getBonuses() {
        let bonuses = [];
        for (let index = 0; index < this.bonusesWithRoundLeft.length; index++) {
            bonuses.push(this.bonusesWithRoundLeft[index].bonus);
        }
        return bonuses;
    }

    pickUpBonus(shark, bonus) {
        switch (bonus.texture.key) {
            case "bomb":
                if(immunity == 0) {
                    hunger += 50;
                    if (hunger > 100){
                        hunger = 100;
                    }
                    if(score < 100){
                        score = 0;
                    } else {
                        score -= 100;
                    }
                } else {
                    immunity = 0;
                }
                break;
            case "shield":
                immunity = 100;
                score += 50;
                break;
            case "heart":
                hunger = 0;
                score += 100;
                break;
            default:
                console.log(bonus);
        }

        this.destroyBonus(bonus);
    }

    shutdown() {
        clearInterval(this.bonusInterval);
    }

    resize(gameSize) {
        this.physics.world.setBounds(0, 0, gameSize.width, gameSize.height, true, true, true, true);
    }
}