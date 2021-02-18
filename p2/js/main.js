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
        this.car = this.physics.add.sprite( 600, 225, 'drive' );
        
        // Make it bounce off of the world bounds.
        this.car.body.collideWorldBounds = true;
        this.car.setInteractive();

        // Create some walls.
        this.walls[0] = this.physics.add.sprite(600, 50, 'wall');
        this.walls[0].scaleX = 35.375;
        this.walls[0].setImmovable(true);
        this.walls[1] = this.physics.add.sprite(600, 850, 'wall');
        this.walls[1].scaleX = 35.375;
        this.walls[1].setImmovable(true);
        this.walls[2] = this.physics.add.sprite(50, 450, 'wall');
        this.walls[2].scaleY = 24;
        this.walls[2].setImmovable(true);
        this.walls[3] = this.physics.add.sprite(1150, 450, 'wall');
        this.walls[3].scaleY = 24;
        this.walls[3].setImmovable(true);
        this.walls[4] = this.physics.add.sprite(600, 350, 'wall');
        this.walls[4].scaleX = 7.25
        this.walls[4].setImmovable(true);
        this.walls[5] = this.physics.add.sprite(600, 550, 'wall');
        this.walls[5].scaleX = 7.25;
        this.walls[5].setImmovable(true);
        this.walls[6] = this.physics.add.sprite(500, 450, 'wall');
        this.walls[6].scaleY = 5.25;
        this.walls[6].setImmovable(true);
        this.walls[7] = this.physics.add.sprite(700, 450, 'wall');
        this.walls[7].scaleY = 5.25;
        this.walls[7].setImmovable(true);
    }
    
    update() {
        // Accelerate the 'drive' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        this.car.rotation = this.physics.accelerateToObject( this.car, this.input.activePointer, 100, 200, 200 );
        this.physics.collide(this.car, this.walls);
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 1200,
    height: 900,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
