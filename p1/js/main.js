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
        
        this.coins = [null];
        this.hazards = [null];
        this.distance = 0;
        this.score = 0;
        this.lost = false;
    }
    
    preload() {
        // Load an image and call it 'disc'.
        this.load.image( 'coin', 'assets/yellow.png' );
        // Load another image and call it 'hazard'.
        this.load.image( 'hazard', 'assets/red.png' );
    }
    
    create() {
        this.cameras.main.setBackgroundColor('rgba(0, 96, 192, 1.0)');
        this.initLevel();
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        let style = { font: "16px Verdana", fill: "#000000", align: "center" };
        let text = this.add.text( this.cameras.main.centerX, 15, "Click the coins and avoid the red dots!", style );
        text.setOrigin( 0.5, 0.0 );
    }
    
    update() {
        for (var i = 0; i < 10; i++) {
            if (this.coins[i].y < 0) {
                this.coins[i].setPosition(this.coins[i].x, this.coins[i].y + 600);
            }
            if (this.coins[i].x < 0) {
                this.coins[i].setPosition(this.coins[i].x + 800);
            }
            if (this.coins[i].y > 600) {
                this.coins[i].setPosition(this.coins[i].x, this.coins[i].y - 600);
            }
            if (this.coins[i].x > 800) {
                this.coins[i].setPosition(this.coins[i].x - 800, this.coins[i].y);
            }
        }
        for (var i = 0; i < this.hazards.length; i++) {
            if (this.hazards[i].y < 0) {
                this.hazards[i].setPosition(this.hazards[i].x, this.hazards[i].y + 600);
            }
            if (this.hazards[i].x < 0) {
                this.hazards[i].setPosition(this.hazards[i].x + 800);
            }
            if (this.hazards[i].y > 600) {
                this.hazards[i].setPosition(this.hazards[i].x, this.hazards[i].y - 600);
            }
            if (this.hazards[i].x > 800) {
                this.hazards[i].setPosition(this.hazards[i].x - 800, this.hazards[i].y);
            }
        }
    }

    initLevel() {
        for (var i = 0; i < 10; i++) {
            this.coins[i] = this.physics.add.sprite( Phaser.Math.Between(0,800), Phaser.Math.Between(0,600), 'coin' );
            this.vec = this.physics.velocityFromAngle(Phaser.Math.Between(0,360), 200);
            this.coins[i].setVelocity(this.vec.x, this.vec.y);
            this.coins[i].setInteractive();
            this.coins[i].on( 'pointerdown', function( pointer ) {
                if (!this.scene.lost) {
                    this.setPosition(Phaser.Math.Between(0,800), Phaser.Math.Between(0,600));
                    this.vec = this.scene.physics.velocityFromAngle(Phaser.Math.Between(0,360), 200);
                    this.setVelocity(this.vec.x, this.vec.y);
                    this.scene.addHazard();
                }
                });
        }
        for (var i = 0; i < 10; i++) {
            this.hazards[i] = this.physics.add.sprite( Phaser.Math.Between(0,800), Phaser.Math.Between(0,600), 'hazard' );
            this.vec = this.physics.velocityFromAngle(Phaser.Math.Between(0,360), 200);
            this.hazards[i].setVelocity(this.vec.x, this.vec.y);
            this.hazards[i].setInteractive();
            this.hazards[i].on( 'pointerdown', function( pointer ) {
                this.scene.endGame();
                });
        }
    }

    addHazard() {
        this.score++;
        this.next = this.hazards.length;
        this.hazards[this.next] = this.physics.add.sprite( Phaser.Math.Between(0,800), Phaser.Math.Between(0,600), 'hazard' );
        this.vec = this.physics.velocityFromAngle(Phaser.Math.Between(0,360), 200);
        this.hazards[this.next].setVelocity(this.vec.x, this.vec.y);
        this.hazards[this.next].setInteractive();
        this.hazards[this.next].on( 'pointerdown', function( pointer ) {
            this.scene.endGame();
            });
    }

    endGame() {
        if (!this.lost) {
            this.lost = true;
            let style = { font: "48px Verdana Bold", fill: "#000000", align: "center" };
            let text = this.add.text( this.cameras.main.centerX, 15, "You got "+this.score+" points\nbefore clicking a red dot", style );
            text.setOrigin( 0.5, -2.0 );
        }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
