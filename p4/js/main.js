import "./phaser.js";

// You can copy-and-paste the code from any of the examples at https://examples.phaser.io here.
// You will need to change the `parent` parameter passed to `new Phaser.Game()` from
// `phaser-example` to `game`, which is the id of the HTML element where we
// want the game to go.
// The assets (and code) can be found at: https://github.com/photonstorm/phaser3-examples
// You will need to change the paths you pass to `this.load.image()` or any other
// loading functions to reflect where you are putting the assets.
// All loading functions will typically all be found inside `preload()`.

// The simplest class example: https://phaser.io/examples/v3/view/scenes/scene-from-es6-class

class MyScene extends Phaser.Scene {
    
    constructor() {
        super();
        
        this.car = null;
        this.walls = [];
    }
    
    preload() {
        // Load an image and call it 'drive'.
        this.load.image( 'drive', 'assets/car.png' );
        this.load.image('bg', 'assets/lake.png');
        this.load.image('wall', 'assets/wall.png');
    }
    
    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg');

        // Create a sprite at the center of the screen using the 'drive' image.
        this.car = this.physics.add.sprite( 560, 624, 'drive' );
        this.car.scaleX = 0.5;
        this.car.scaleY = 0.5;
        
        // Make it bounce off of the world bounds.
        this.car.body.collideWorldBounds = true;
        this.car.setInteractive();

        // Create some walls.
        this.walls[0] = this.physics.add.sprite(360, 32, 'wall');
        this.walls[0].scaleX = 19.5;
        this.walls[0].setImmovable(true);
        this.walls[1] = this.physics.add.sprite(32, 360, 'wall');
        this.walls[1].scaleY = 21.5;
        this.walls[1].setImmovable(true);
        this.walls[2] = this.physics.add.sprite(544, 688, 'wall');
        this.walls[2].scaleX = 31;
        this.walls[2].setImmovable(true);
        this.walls[3] = this.physics.add.sprite(1024, 488, 'wall');
        this.walls[3].scaleY = 11.5;
        this.walls[3].setImmovable(true);
        this.walls[4] = this.physics.add.sprite(1152, 320, 'wall');
        this.walls[4].scaleX = 7;
        this.walls[4].setImmovable(true);
        this.walls[5] = this.physics.add.sprite(768, 160, 'wall');
        this.walls[5].scaleY = 7;
        this.walls[5].setImmovable(true);
        this.walls[6] = this.physics.add.sprite(1248, 160, 'wall');
        this.walls[6].scaleY = 9;
        this.walls[6].setImmovable(true);
        this.walls[7] = this.physics.add.sprite(992, 32, 'wall');
        this.walls[7].scaleX = 15;
        this.walls[7].setImmovable(true);
        this.walls[8] = this.physics.add.sprite(728, 288, 'wall');
        this.walls[8].scaleX = 3.5;
        this.walls[8].setImmovable(true);
        this.walls[9] = this.physics.add.sprite(688, 144, 'wall');
        this.walls[9].scaleY = 8;
        this.walls[9].setImmovable(true);
        this.walls[10] = this.physics.add.sprite(544, 560, 'wall');
        this.walls[10].scaleX = 23;
        this.walls[10].setImmovable(true);
        this.walls[11] = this.physics.add.sprite(160, 520, 'wall');
        this.walls[11].scaleY = 3.5;
        this.walls[11].setImmovable(true);
        this.walls[12] = this.physics.add.sprite(232, 352, 'wall');
        this.walls[12].scaleX = 11.5;
        this.walls[12].setImmovable(true);
        this.walls[13] = this.physics.add.sprite(432, 392, 'wall');
        this.walls[13].scaleY = 3.5;
        this.walls[13].setImmovable(true);
        this.walls[14] = this.physics.add.sprite(560, 344, 'wall');
        this.walls[14].scaleY = 12.5;
        this.walls[14].setImmovable(true);
        this.walls[15] = this.physics.add.sprite(360, 224, 'wall');
        this.walls[15].scaleX = 11.5;
        this.walls[15].setImmovable(true);
        this.walls[16] = this.physics.add.sprite(160, 192, 'wall');
        this.walls[16].scaleY = 3;
        this.walls[16].setImmovable(true);
        this.walls[17] = this.physics.add.sprite(360, 160, 'wall');
        this.walls[17].scaleX = 11.5;
        this.walls[17].setImmovable(true);
        this.walls[18] = this.physics.add.sprite(896, 344, 'wall');
        this.walls[18].scaleY = 12.5;
        this.walls[18].setImmovable(true);
        this.walls[19] = this.physics.add.sprite(1024, 176, 'wall');
        this.walls[19].scaleX = 7;
        this.walls[19].scaleY = 2;
        this.walls[19].setImmovable(true);
    }
    
    update() {
        // Accelerate the 'drive' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        if (this.input.activePointer.isDown) {
            this.car.rotation = this.physics.accelerateToObject( this.car, this.input.activePointer, 100, 200, 200 );
        } else {
            this.car.rotation = this.physics.accelerateToObject( this.car, this.input.activePointer, 200, 100, 100 );
        }
        this.physics.collide(this.car, this.walls);
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    height: 720,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
