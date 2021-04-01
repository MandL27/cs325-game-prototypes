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


var blue = null;
var orange = null;
var dots = [];
var walls = [];
var text = null;
var waitTimer = 180;
var state = 0;
var blueDir = null;
var orangeDir = null;
var blueScore = 0;
var orangeScore = 0;
var dotsLeft = 156;
var inputList;

class MyScene extends Phaser.Scene {
    constructor() {
        super();
    }
    
    preload() {
        this.load.image( 'bg', 'assets/bg.png' );
        this.load.image( 'wall', 'assets/wall.png' );
        this.load.image( 'blue', 'assets/blue.png' );
        this.load.image( 'orange', 'assets/orange.png' );
        this.load.image( 'dot', 'assets/dot.png' );
        inputList = this.input.keyboard.addKeys({
            blueUp: 'W', blueDown: 'S', blueLeft: 'A', blueRight: 'D',
            orangeUp: 'up', orangeDown: 'down', orangeLeft: 'left', orangeRight: 'right'});
    }
    
    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg');

        blue = this.physics.add.sprite(256, 288, 'blue');
        orange = this.physics.add.sprite(320, 288, 'orange');

        this.physics.add.overlap(blue, walls, this.blueHitWall);
        this.physics.add.overlap(orange, walls, this.orangeHitWall);
        this.physics.add.overlap(blue, dots, this.blueAteDot);
        this.physics.add.overlap(orange, dots, this.orangeAteDot);
        this.physics.add.overlap(blue, orange, this.playersCollided);

        {
            walls[0] = this.physics.add.sprite(288, 256, 'wall');
            walls[0].scaleX = 3;
            walls[0].setImmovable(true);
            walls[1] = this.physics.add.sprite(288, 320, 'wall');
            walls[1].scaleX = 3;
            walls[1].setImmovable(true);
            walls[2] = this.physics.add.sprite(192, 224, 'wall');
            walls[2].scaleY = 3;
            walls[2].setImmovable(true);
            walls[3] = this.physics.add.sprite(384, 352, 'wall');
            walls[3].scaleY = 3;
            walls[3].setImmovable(true);
            walls[4] = this.physics.add.sprite(128, 288, 'wall');
            walls[4].scaleY = 3;
            walls[4].setImmovable(true);
            walls[5] = this.physics.add.sprite(448, 288, 'wall');
            walls[5].scaleY = 3;
            walls[5].setImmovable(true);
            walls[6] = this.physics.add.sprite(192, 64, 'wall');
            walls[6].scaleY = 3;
            walls[6].setImmovable(true);
            walls[7] = this.physics.add.sprite(384, 512, 'wall');
            walls[7].scaleY = 3;
            walls[7].setImmovable(true);
            walls[8] = this.physics.add.sprite(256, 160, 'wall');
            walls[8].scaleY = 3;
            walls[8].setImmovable(true);
            walls[9] = this.physics.add.sprite(320, 416, 'wall');
            walls[9].scaleY = 3;
            walls[9].setImmovable(true);
            walls[10] = this.physics.add.sprite(256, 464, 'wall');
            walls[10].scaleY = 2;
            walls[10].setImmovable(true);
            walls[11] = this.physics.add.sprite(320, 112, 'wall');
            walls[11].scaleY = 2;
            walls[11].setImmovable(true);
            walls[12] = this.physics.add.sprite(64, 192, 'wall');
            walls[12].scaleY = 5;
            walls[12].setImmovable(true);
            walls[13] = this.physics.add.sprite(512, 384, 'wall');
            walls[13].scaleY = 5;
            walls[13].setImmovable(true);
            walls[14] = this.physics.add.sprite(192, 384, 'wall');
            walls[14].scaleY = 5;
            walls[14].setImmovable(true);
            walls[15] = this.physics.add.sprite(384, 192, 'wall');
            walls[15].scaleY = 5;
            walls[15].setImmovable(true);
            walls[16] = this.physics.add.sprite(96, 480, 'wall');
            walls[16].scaleX = 3;
            walls[16].scaleY = 3;
            walls[16].setImmovable(true);
            walls[17] = this.physics.add.sprite(480, 96, 'wall');
            walls[17].scaleX = 3;
            walls[17].scaleY = 3;
            walls[17].setImmovable(true);
            walls[18] = this.physics.add.sprite(96, 64, 'wall');
            walls[18].scaleX = 3;
            walls[18].setImmovable(true);
            walls[19] = this.physics.add.sprite(480, 512, 'wall');
            walls[19].scaleX = 3;
            walls[19].setImmovable(true);
            walls[20] = this.physics.add.sprite(160, 128, 'wall');
            walls[20].scaleX = 3;
            walls[20].setImmovable(true);
            walls[21] = this.physics.add.sprite(416, 448, 'wall');
            walls[21].scaleX = 3;
            walls[21].setImmovable(true);
            walls[22] = this.physics.add.sprite(272, 384, 'wall');
            walls[22].scaleX = 2;
            walls[22].setImmovable(true);
            walls[23] = this.physics.add.sprite(304, 192, 'wall');
            walls[23].scaleX = 2;
            walls[23].setImmovable(true);
            walls[24] = this.physics.add.sprite(48, 320, 'wall');
            walls[24].scaleX = 2;
            walls[24].setImmovable(true);
            walls[25] = this.physics.add.sprite(528, 256, 'wall');
            walls[25].scaleX = 2;
            walls[25].setImmovable(true);
            walls[26] = this.physics.add.sprite(112, 192, 'wall');
            walls[26].scaleX = 2;
            walls[26].setImmovable(true);
            walls[27] = this.physics.add.sprite(464, 384, 'wall');
            walls[27].scaleX = 2;
            walls[27].setImmovable(true);
            walls[28] = this.physics.add.sprite(112, 384, 'wall');
            walls[28].scaleX = 4;
            walls[28].setImmovable(true);
            walls[29] = this.physics.add.sprite(464, 192, 'wall');
            walls[29].scaleX = 4;
            walls[29].setImmovable(true);
            walls[30] = this.physics.add.sprite(112, 384, 'wall');
            walls[30].scaleX = 4;
            walls[30].setImmovable(true);
            walls[31] = this.physics.add.sprite(464, 192, 'wall');
            walls[31].scaleX = 4;
            walls[31].setImmovable(true);
            walls[32] = this.physics.add.sprite(256, 512, 'wall');
            walls[32].scaleX = 5;
            walls[32].setImmovable(true);
            walls[33] = this.physics.add.sprite(320, 64, 'wall');
            walls[33].scaleX = 5;
            walls[33].setImmovable(true);
            walls[34] = this.physics.add.sprite(288, 0, 'wall');
            walls[34].scaleX = 19;
            walls[34].setImmovable(true);
            walls[35] = this.physics.add.sprite(288, 576, 'wall');
            walls[35].scaleX = 19;
            walls[35].setImmovable(true);
            walls[36] = this.physics.add.sprite(0, 288, 'wall');
            walls[36].scaleY = 17;
            walls[36].setImmovable(true);
            walls[37] = this.physics.add.sprite(576, 288, 'wall');
            walls[37].scaleY = 17;
            walls[37].setImmovable(true);
        }

        {
            dots.push(this.physics.add.sprite( 32,  32, 'dot'));
            dots.push(this.physics.add.sprite( 64,  32, 'dot'));
            dots.push(this.physics.add.sprite( 96,  32, 'dot'));
            dots.push(this.physics.add.sprite(128,  32, 'dot'));
            dots.push(this.physics.add.sprite(160,  32, 'dot'));
            dots.push(this.physics.add.sprite(224,  32, 'dot'));
            dots.push(this.physics.add.sprite(256,  32, 'dot'));
            dots.push(this.physics.add.sprite(288,  32, 'dot'));
            dots.push(this.physics.add.sprite(320,  32, 'dot'));
            dots.push(this.physics.add.sprite(352,  32, 'dot'));
            dots.push(this.physics.add.sprite(384,  32, 'dot'));
            dots.push(this.physics.add.sprite(416,  32, 'dot'));
            dots.push(this.physics.add.sprite(448,  32, 'dot'));
            dots.push(this.physics.add.sprite(480,  32, 'dot'));
            dots.push(this.physics.add.sprite(512,  32, 'dot'));
            dots.push(this.physics.add.sprite(544,  32, 'dot'));
            dots.push(this.physics.add.sprite( 32,  64, 'dot'));
            dots.push(this.physics.add.sprite(160,  64, 'dot'));
            dots.push(this.physics.add.sprite(224,  64, 'dot'));
            dots.push(this.physics.add.sprite(416,  64, 'dot'));
            dots.push(this.physics.add.sprite(544,  64, 'dot'));
            dots.push(this.physics.add.sprite( 32,  96, 'dot'));
            dots.push(this.physics.add.sprite( 64,  96, 'dot'));
            dots.push(this.physics.add.sprite( 96,  96, 'dot'));
            dots.push(this.physics.add.sprite(128,  96, 'dot'));
            dots.push(this.physics.add.sprite(160,  96, 'dot'));
            dots.push(this.physics.add.sprite(224,  96, 'dot'));
            dots.push(this.physics.add.sprite(256,  96, 'dot'));
            dots.push(this.physics.add.sprite(288,  96, 'dot'));
            dots.push(this.physics.add.sprite(352,  96, 'dot'));
            dots.push(this.physics.add.sprite(384,  96, 'dot'));
            dots.push(this.physics.add.sprite(416,  96, 'dot'));
            dots.push(this.physics.add.sprite(544,  96, 'dot'));
            dots.push(this.physics.add.sprite( 32, 128, 'dot'));
            dots.push(this.physics.add.sprite( 96, 128, 'dot'));
            dots.push(this.physics.add.sprite(224, 128, 'dot'));
            dots.push(this.physics.add.sprite(288, 128, 'dot'));
            dots.push(this.physics.add.sprite(352, 128, 'dot'));
            dots.push(this.physics.add.sprite(416, 128, 'dot'));
            dots.push(this.physics.add.sprite(544, 128, 'dot'));
            dots.push(this.physics.add.sprite( 32, 160, 'dot'));
            dots.push(this.physics.add.sprite( 96, 160, 'dot'));
            dots.push(this.physics.add.sprite(128, 160, 'dot'));
            dots.push(this.physics.add.sprite(160, 160, 'dot'));
            dots.push(this.physics.add.sprite(192, 160, 'dot'));
            dots.push(this.physics.add.sprite(224, 160, 'dot'));
            dots.push(this.physics.add.sprite(288, 160, 'dot'));
            dots.push(this.physics.add.sprite(320, 160, 'dot'));
            dots.push(this.physics.add.sprite(352, 160, 'dot'));
            dots.push(this.physics.add.sprite(416, 160, 'dot'));
            dots.push(this.physics.add.sprite(448, 160, 'dot'));
            dots.push(this.physics.add.sprite(480, 160, 'dot'));
            dots.push(this.physics.add.sprite(512, 160, 'dot'));
            dots.push(this.physics.add.sprite(544, 160, 'dot'));
            dots.push(this.physics.add.sprite( 32, 192, 'dot'));
            dots.push(this.physics.add.sprite(160, 192, 'dot'));
            dots.push(this.physics.add.sprite(224, 192, 'dot'));
            dots.push(this.physics.add.sprite(352, 192, 'dot'));
            dots.push(this.physics.add.sprite(544, 192, 'dot'));
            dots.push(this.physics.add.sprite( 32, 224, 'dot'));
            dots.push(this.physics.add.sprite( 96, 224, 'dot'));
            dots.push(this.physics.add.sprite(128, 224, 'dot'));
            dots.push(this.physics.add.sprite(160, 224, 'dot'));
            dots.push(this.physics.add.sprite(416, 224, 'dot'));
            dots.push(this.physics.add.sprite(448, 224, 'dot'));
            dots.push(this.physics.add.sprite(480, 224, 'dot'));
            dots.push(this.physics.add.sprite(512, 224, 'dot'));
            dots.push(this.physics.add.sprite(544, 224, 'dot'));
            dots.push(this.physics.add.sprite( 32, 256, 'dot'));
            dots.push(this.physics.add.sprite( 96, 256, 'dot'));
            dots.push(this.physics.add.sprite(160, 256, 'dot'));
            dots.push(this.physics.add.sprite(416, 256, 'dot'));
            dots.push(this.physics.add.sprite(480, 256, 'dot'));
            dots.push(this.physics.add.sprite( 32, 288, 'dot'));
            dots.push(this.physics.add.sprite( 64, 288, 'dot'));
            dots.push(this.physics.add.sprite( 96, 288, 'dot'));
            dots.push(this.physics.add.sprite(160, 288, 'dot'));
            dots.push(this.physics.add.sprite(192, 288, 'dot'));
            dots.push(this.physics.add.sprite(384, 288, 'dot'));
            dots.push(this.physics.add.sprite(416, 288, 'dot'));
            dots.push(this.physics.add.sprite(480, 288, 'dot'));
            dots.push(this.physics.add.sprite(512, 288, 'dot'));
            dots.push(this.physics.add.sprite(544, 288, 'dot'));
            dots.push(this.physics.add.sprite( 96, 320, 'dot'));
            dots.push(this.physics.add.sprite(160, 320, 'dot'));
            dots.push(this.physics.add.sprite(416, 320, 'dot'));
            dots.push(this.physics.add.sprite(480, 320, 'dot'));
            dots.push(this.physics.add.sprite(544, 320, 'dot'));
            dots.push(this.physics.add.sprite( 32, 352, 'dot'));
            dots.push(this.physics.add.sprite( 64, 352, 'dot'));
            dots.push(this.physics.add.sprite( 96, 352, 'dot'));
            dots.push(this.physics.add.sprite(128, 352, 'dot'));
            dots.push(this.physics.add.sprite(160, 352, 'dot'));
            dots.push(this.physics.add.sprite(416, 352, 'dot'));
            dots.push(this.physics.add.sprite(448, 352, 'dot'));
            dots.push(this.physics.add.sprite(480, 352, 'dot'));
            dots.push(this.physics.add.sprite(544, 352, 'dot'));
            dots.push(this.physics.add.sprite( 32, 384, 'dot'));
            dots.push(this.physics.add.sprite(224, 384, 'dot'));
            dots.push(this.physics.add.sprite(352, 384, 'dot'));
            dots.push(this.physics.add.sprite(416, 384, 'dot'));
            dots.push(this.physics.add.sprite(544, 384, 'dot'));
            dots.push(this.physics.add.sprite( 32, 416, 'dot'));
            dots.push(this.physics.add.sprite( 64, 416, 'dot'));
            dots.push(this.physics.add.sprite( 96, 416, 'dot'));
            dots.push(this.physics.add.sprite(128, 416, 'dot'));
            dots.push(this.physics.add.sprite(160, 416, 'dot'));
            dots.push(this.physics.add.sprite(224, 416, 'dot'));
            dots.push(this.physics.add.sprite(256, 416, 'dot'));
            dots.push(this.physics.add.sprite(288, 416, 'dot'));
            dots.push(this.physics.add.sprite(352, 416, 'dot'));
            dots.push(this.physics.add.sprite(384, 416, 'dot'));
            dots.push(this.physics.add.sprite(416, 416, 'dot'));
            dots.push(this.physics.add.sprite(448, 416, 'dot'));
            dots.push(this.physics.add.sprite(480, 416, 'dot'));
            dots.push(this.physics.add.sprite(544, 416, 'dot'));
            dots.push(this.physics.add.sprite( 32, 448, 'dot'));
            dots.push(this.physics.add.sprite(160, 448, 'dot'));
            dots.push(this.physics.add.sprite(224, 448, 'dot'));
            dots.push(this.physics.add.sprite(288, 448, 'dot'));
            dots.push(this.physics.add.sprite(352, 448, 'dot'));
            dots.push(this.physics.add.sprite(480, 448, 'dot'));
            dots.push(this.physics.add.sprite(544, 448, 'dot'));
            dots.push(this.physics.add.sprite( 32, 480, 'dot'));
            dots.push(this.physics.add.sprite(160, 480, 'dot'));
            dots.push(this.physics.add.sprite(192, 480, 'dot'));
            dots.push(this.physics.add.sprite(224, 480, 'dot'));
            dots.push(this.physics.add.sprite(288, 480, 'dot'));
            dots.push(this.physics.add.sprite(320, 480, 'dot'));
            dots.push(this.physics.add.sprite(352, 480, 'dot'));
            dots.push(this.physics.add.sprite(416, 480, 'dot'));
            dots.push(this.physics.add.sprite(448, 480, 'dot'));
            dots.push(this.physics.add.sprite(480, 480, 'dot'));
            dots.push(this.physics.add.sprite(512, 480, 'dot'));
            dots.push(this.physics.add.sprite(544, 480, 'dot'));
            dots.push(this.physics.add.sprite( 32, 512, 'dot'));
            dots.push(this.physics.add.sprite(160, 512, 'dot'));
            dots.push(this.physics.add.sprite(352, 512, 'dot'));
            dots.push(this.physics.add.sprite(416, 512, 'dot'));
            dots.push(this.physics.add.sprite(544, 512, 'dot'));
            dots.push(this.physics.add.sprite( 32, 544, 'dot'));
            dots.push(this.physics.add.sprite( 64, 544, 'dot'));
            dots.push(this.physics.add.sprite( 96, 544, 'dot'));
            dots.push(this.physics.add.sprite(128, 544, 'dot'));
            dots.push(this.physics.add.sprite(160, 544, 'dot'));
            dots.push(this.physics.add.sprite(192, 544, 'dot'));
            dots.push(this.physics.add.sprite(224, 544, 'dot'));
            dots.push(this.physics.add.sprite(256, 544, 'dot'));
            dots.push(this.physics.add.sprite(288, 544, 'dot'));
            dots.push(this.physics.add.sprite(320, 544, 'dot'));
            dots.push(this.physics.add.sprite(352, 544, 'dot'));
            dots.push(this.physics.add.sprite(416, 544, 'dot'));
            dots.push(this.physics.add.sprite(448, 544, 'dot'));
            dots.push(this.physics.add.sprite(480, 544, 'dot'));
            dots.push(this.physics.add.sprite(512, 544, 'dot'));
            dots.push(this.physics.add.sprite(544, 544, 'dot'));
        }
        

        let style = { font: "25px Verdana", fill: "#80ff80", align: "center" };
        text = this.add.text( this.cameras.main.centerX, this.cameras.main.centerY, "Ready", style );
        text.setOrigin( 0.5, 0.5 );
    }
    
    update() {
        if (state === 0) {
            if (waitTimer > 0) {
                waitTimer--;
            } else {
                state = 1;
                waitTimer = 60;
                text.text = "Go!";
                blueDir = {x: -4, y: 0};
                orangeDir = {x: 4, y: 0};
            }
        } else if (state === 1) {
            if (waitTimer > 0) {
                waitTimer--;
            } else {
                text.text = "";
            }
            blue.x += blueDir.x;
            blue.y += blueDir.y;
            orange.x += orangeDir.x;
            orange.y += orangeDir.y;
            if (blue.x % 32 === 0 && blue.y % 32 === 0) {
                if (inputList.blueUp.isDown) {
                    blueDir = {x: 0, y: -4};
                } else if (inputList.blueDown.isDown) {
                    blueDir = {x: 0, y: 4};
                } else if (inputList.blueLeft.isDown) {
                    blueDir = {x: -4, y: 0};
                } else if (inputList.blueRight.isDown) {
                    blueDir = {x: 4, y: 0};
                }
            }
            if (orange.x % 32 === 0 && orange.y % 32 === 0) {
                if (inputList.orangeUp.isDown) {
                    orangeDir = {x: 0, y: -4};
                } else if (inputList.orangeDown.isDown) {
                    orangeDir = {x: 0, y: 4};
                } else if (inputList.orangeLeft.isDown) {
                    orangeDir = {x: -4, y: 0};
                } else if (inputList.orangeRight.isDown) {
                    orangeDir = {x: 4, y: 0};
                }
            }
        } else if (state === 2) {
            blueDir = {x: 0, y: 0};
            orangeDir = {x: 0, y: 0};
            if (blueScore > orangeScore) {
                text.text = "Blue wins!\n\n\n\n"+blueScore+" - "+orangeScore;
            } else if (orangeScore > blueScore) {
                text.text = "Orange wins!\n\n\n\n"+blueScore+" - "+orangeScore;
            } else {
                text.text = "Tie!\n\n\n\n"+blueScore+" - "+orangeScore;
            }
        }
    }

    blueHitWall(blue, wall) {
        // depenetrate and stop moving
        blue.x -= blueDir.x;
        blue.y -= blueDir.y;
        blueDir = {x: 0, y: 0};
    }

    orangeHitWall(orange, wall) {
        // depenetrate and stop moving
        orange.x -= orangeDir.x;
        orange.y -= orangeDir.y;
        orangeDir = {x: 0, y: 0};
    }

    blueAteDot(blue, dot) {
        dot.body.enable = false;
        dot.visible = false;
        dotsLeft--;
        blueScore++;
        if (dotsLeft === 0) {
            state = 2;
        }
    }

    orangeAteDot(orange, dot) {
        dot.body.enable = false;
        dot.visible = false;
        dotsLeft--;
        orangeScore++;
        if (dotsLeft === 0) {
            state = 2;
        }
    }

    playersCollided(blue, orange) {
        while (blue.x % 32 != 0) {
            blue.x -= blueDir.x;
        }
        while (blue.y % 32 != 0) {
            blue.y -= blueDir.y;
        }
        blueDir = {x: 0, y: 0};
        while (orange.x % 32 != 0) {
            orange.x -= orangeDir.x;
        }
        while (orange.y % 32 != 0) {
            orange.y -= orangeDir.y;
        }
        orangeDir = {x: 0, y: 0};
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 576,
    height: 576,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
