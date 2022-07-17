class PlayerManager extends Phaser.Scene {
    constructor() {
        super("playerManager");
    }

    create(){
        this.input.keyboard.on('keydown', function (event) {
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.ESC) {
                this.shark.destroy();
                this.scene.start("gameOver");
            }
        }, this);
    }

    init(shark){
        this.shark = shark;
    }

    move_shark(shark, speed){
        let distanceFromMouseX = shark.x - mouse.x ;
        let distanceFromMouseY = shark.y - mouse.y ;
        shark.x -= distanceFromMouseX / speed;
        shark.y -= distanceFromMouseY / speed;
        shark.flipX = distanceFromMouseX < 0;
        shark.depth = 1;
    }

    touch_shark(shark, speed){
        let startX = shark.x;
        let distanceFromTouchX = shark.x - touch.x;
        let distanceFromTouchY = shark.y - touch.y;
        shark.x -= distanceFromTouchX / speed;
        shark.y -= distanceFromTouchY / speed;
        shark.flipX = touch.x > startX;
        shark.depth = 1;
    }

    update(){
        if(mobie == true){
            this.touch_shark(this.shark, 15);
        } else {
            this.move_shark(this.shark, 15);
        }

        if(hunger >= 100){
            this.shark.destroy();
            this.scene.start("gameOver");
        }
    }
}