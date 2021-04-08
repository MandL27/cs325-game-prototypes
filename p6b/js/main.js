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
var yellow = null;
var red = null;
var green = null;
var dots = [];
var walls = [];
var text = null;
var waitTimer = 180;
var state = 0;
var blueDir = null;
var yellowDir = null;
var redDir = null;
var greenDir = null;
var blueScore = 0;
var yellowScore = 0;
var redScore = 0;
var greenScore = 0;
var dotsLeft = 208;
var inputList;

class MyScene extends Phaser.Scene {
    constructor() {
        super();
    }
    
    preload() {
        this.load.image( 'bg', 'assets/bg.png' );
        this.load.image( 'wall', 'assets/wall.png' );
        this.load.image( 'blue', 'assets/blue.png' );
        this.load.image( 'yellow', 'assets/yellow.png' );
        this.load.image( 'red', 'assets/red.png' );
        this.load.image( 'green', 'assets/green.png' );
        this.load.image( 'dot', 'assets/dot.png' );
        inputList = this.input.keyboard.addKeys({
            blueUp: 'W', blueDown: 'S', blueLeft: 'A', blueRight: 'D',
            redUp: 'I', redDown: 'K', redLeft: 'J', redRight: 'L',
            yellowUp: 'up', yellowDown: 'down', yellowLeft: 'left', yellowRight: 'right',
            greenUp: 'numpad_eight', greenDown: 'numpad_five', greenLeft: 'numpad_four', greenRight: 'numpad_six'});
    }
    
    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg');

        blue = this.physics.add.sprite(288, 352, 'blue');
        yellow = this.physics.add.sprite(416, 352, 'yellow');
        red = this.physics.add.sprite(352, 288, 'red');
        green = this.physics.add.sprite(352, 416, 'green');

        this.physics.add.overlap(blue, walls, this.blueHitWall);
        this.physics.add.overlap(yellow, walls, this.yellowHitWall);
        this.physics.add.overlap(red, walls, this.redHitWall);
        this.physics.add.overlap(green, walls, this.greenHitWall);
        this.physics.add.overlap(blue, dots, this.blueAteDot);
        this.physics.add.overlap(yellow, dots, this.yellowAteDot);
        this.physics.add.overlap(red, dots, this.redAteDot);
        this.physics.add.overlap(green, dots, this.greenAteDot);

        {
            walls[0] = this.physics.add.sprite(416,  64, 'wall');
            walls[0].scaleX = 3;
            walls[0].setImmovable(true);
            walls[1] = this.physics.add.sprite(288, 640, 'wall');
            walls[1].scaleX = 3;
            walls[1].setImmovable(true);
            walls[2] = this.physics.add.sprite( 64, 288, 'wall');
            walls[2].scaleY = 3;
            walls[2].setImmovable(true);
            walls[3] = this.physics.add.sprite(640, 416, 'wall');
            walls[3].scaleY = 3;
            walls[3].setImmovable(true);
            walls[4] = this.physics.add.sprite(288, 192, 'wall');
            walls[4].scaleX = 3;
            walls[4].setImmovable(true);
            walls[5] = this.physics.add.sprite(416, 512, 'wall');
            walls[5].scaleX = 3;
            walls[5].setImmovable(true);
            walls[6] = this.physics.add.sprite(192, 416, 'wall');
            walls[6].scaleY = 3;
            walls[6].setImmovable(true);
            walls[7] = this.physics.add.sprite(512, 288, 'wall');
            walls[7].scaleY = 3;
            walls[7].setImmovable(true);
            walls[8] = this.physics.add.sprite(608, 192, 'wall');
            walls[8].scaleX = 3;
            walls[8].setImmovable(true);
            walls[9] = this.physics.add.sprite( 96, 512, 'wall');
            walls[9].scaleX = 3;
            walls[9].setImmovable(true);
            walls[10] = this.physics.add.sprite(192,  96, 'wall');
            walls[10].scaleY = 3;
            walls[10].setImmovable(true);
            walls[11] = this.physics.add.sprite(512, 608, 'wall');
            walls[11].scaleY = 3;
            walls[11].setImmovable(true);
            walls[12] = this.physics.add.sprite(448, 192, 'wall');
            walls[12].scaleX = 5;
            walls[12].setImmovable(true);
            walls[13] = this.physics.add.sprite(256, 512, 'wall');
            walls[13].scaleX = 5;
            walls[13].setImmovable(true);
            walls[14] = this.physics.add.sprite(192, 256, 'wall');
            walls[14].scaleY = 5;
            walls[14].setImmovable(true);
            walls[15] = this.physics.add.sprite(512, 448, 'wall');
            walls[15].scaleY = 5;
            walls[15].setImmovable(true);
            walls[16] = this.physics.add.sprite( 96,  96, 'wall');
            walls[16].scaleX = 3;
            walls[16].scaleY = 3;
            walls[16].setImmovable(true);
            walls[17] = this.physics.add.sprite(608,  96, 'wall');
            walls[17].scaleX = 3;
            walls[17].scaleY = 3;
            walls[17].setImmovable(true);
            walls[18] = this.physics.add.sprite( 96, 608, 'wall');
            walls[18].scaleX = 3;
            walls[18].scaleY = 3;
            walls[18].setImmovable(true);
            walls[19] = this.physics.add.sprite(608, 608, 'wall');
            walls[19].scaleX = 3;
            walls[19].scaleY = 3;
            walls[19].setImmovable(true);
            walls[20] = this.physics.add.sprite(560, 256, 'wall');
            walls[20].scaleX = 2;
            walls[20].setImmovable(true);
            walls[21] = this.physics.add.sprite(144, 448, 'wall');
            walls[21].scaleX = 2;
            walls[21].setImmovable(true);
            walls[22] = this.physics.add.sprite(256, 144, 'wall');
            walls[22].scaleY = 2;
            walls[22].setImmovable(true);
            walls[23] = this.physics.add.sprite(448, 560, 'wall');
            walls[23].scaleY = 2;
            walls[23].setImmovable(true);
            walls[24] = this.physics.add.sprite(512,  96, 'wall');
            walls[24].scaleY = 3;
            walls[24].setImmovable(true);
            walls[25] = this.physics.add.sprite(192, 608, 'wall');
            walls[25].scaleY = 3;
            walls[25].setImmovable(true);
            walls[26] = this.physics.add.sprite( 96, 192, 'wall');
            walls[26].scaleX = 3;
            walls[26].setImmovable(true);
            walls[27] = this.physics.add.sprite(608, 512, 'wall');
            walls[27].scaleX = 3;
            walls[27].setImmovable(true);
            walls[28] = this.physics.add.sprite(320,  80, 'wall');
            walls[28].scaleY = 4;
            walls[28].setImmovable(true);
            walls[29] = this.physics.add.sprite(384, 624, 'wall');
            walls[29].scaleY = 4;
            walls[29].setImmovable(true);
            walls[30] = this.physics.add.sprite( 80, 384, 'wall');
            walls[30].scaleX = 4;
            walls[30].setImmovable(true);
            walls[31] = this.physics.add.sprite(624, 320, 'wall');
            walls[31].scaleX = 4;
            walls[31].setImmovable(true);
            walls[32] = this.physics.add.sprite(320, 592, 'wall');
            walls[32].scaleY = 2;
            walls[32].setImmovable(true);
            walls[33] = this.physics.add.sprite(384, 112, 'wall');
            walls[33].scaleY = 2;
            walls[33].setImmovable(true);
            walls[34] = this.physics.add.sprite(112, 320, 'wall');
            walls[34].scaleX = 2;
            walls[34].setImmovable(true);
            walls[35] = this.physics.add.sprite(592, 384, 'wall');
            walls[35].scaleX = 2;
            walls[35].setImmovable(true);
            walls[36] = this.physics.add.sprite(256, 560, 'wall');
            walls[36].scaleY = 2;
            walls[36].setImmovable(true);
            walls[37] = this.physics.add.sprite(448, 144, 'wall');
            walls[37].scaleY = 2;
            walls[37].setImmovable(true);
            walls[38] = this.physics.add.sprite(144, 256, 'wall');
            walls[38].scaleX = 2;
            walls[38].setImmovable(true);
            walls[39] = this.physics.add.sprite(560, 448, 'wall');
            walls[39].scaleX = 2;
            walls[39].setImmovable(true);
            walls[40] = this.physics.add.sprite( 64, 464, 'wall');
            walls[40].scaleY = 2;
            walls[40].setImmovable(true);
            walls[41] = this.physics.add.sprite(640, 240, 'wall');
            walls[41].scaleY = 2;
            walls[41].setImmovable(true);
            walls[42] = this.physics.add.sprite(240,  64, 'wall');
            walls[42].scaleX = 2;
            walls[42].setImmovable(true);
            walls[43] = this.physics.add.sprite(464, 640, 'wall');
            walls[43].scaleX = 2;
            walls[43].setImmovable(true);
            walls[44] = this.physics.add.sprite(288, 288, 'wall');
            walls[44].scaleX = 3;
            walls[44].scaleY = 3;
            walls[44].setImmovable(true);
            walls[45] = this.physics.add.sprite(416, 288, 'wall');
            walls[45].scaleX = 3;
            walls[45].scaleY = 3;
            walls[45].setImmovable(true);
            walls[46] = this.physics.add.sprite(288, 416, 'wall');
            walls[46].scaleX = 3;
            walls[46].scaleY = 3;
            walls[46].setImmovable(true);
            walls[47] = this.physics.add.sprite(416, 416, 'wall');
            walls[47].scaleX = 3;
            walls[47].scaleY = 3;
            walls[47].setImmovable(true);
            walls[48] = this.physics.add.sprite(352, 0, 'wall');
            walls[48].scaleX = 23;
            walls[48].setImmovable(true);
            walls[49] = this.physics.add.sprite(352, 704, 'wall');
            walls[49].scaleX = 23;
            walls[49].setImmovable(true);
            walls[50] = this.physics.add.sprite(0, 352, 'wall');
            walls[50].scaleY = 21;
            walls[50].setImmovable(true);
            walls[51] = this.physics.add.sprite(704, 352, 'wall');
            walls[51].scaleY = 21;
            walls[51].setImmovable(true);
        }

        {
            dots.push(this.physics.add.sprite( 32,  32, 'dot'));
            dots.push(this.physics.add.sprite( 64,  32, 'dot'));
            dots.push(this.physics.add.sprite( 96,  32, 'dot'));
            dots.push(this.physics.add.sprite(128,  32, 'dot'));
            dots.push(this.physics.add.sprite(160,  32, 'dot'));
            dots.push(this.physics.add.sprite(192,  32, 'dot'));
            dots.push(this.physics.add.sprite(224,  32, 'dot'));
            dots.push(this.physics.add.sprite(256,  32, 'dot'));
            dots.push(this.physics.add.sprite(288,  32, 'dot'));
            dots.push(this.physics.add.sprite(352,  32, 'dot'));
            dots.push(this.physics.add.sprite(384,  32, 'dot'));
            dots.push(this.physics.add.sprite(416,  32, 'dot'));
            dots.push(this.physics.add.sprite(448,  32, 'dot'));
            dots.push(this.physics.add.sprite(480,  32, 'dot'));
            dots.push(this.physics.add.sprite(512,  32, 'dot'));
            dots.push(this.physics.add.sprite(544,  32, 'dot'));
            dots.push(this.physics.add.sprite(576,  32, 'dot'));
            dots.push(this.physics.add.sprite(608,  32, 'dot'));
            dots.push(this.physics.add.sprite(640,  32, 'dot'));
            dots.push(this.physics.add.sprite(672,  32, 'dot'));
            dots.push(this.physics.add.sprite( 32,  64, 'dot'));
            dots.push(this.physics.add.sprite(160,  64, 'dot'));
            dots.push(this.physics.add.sprite(288,  64, 'dot'));
            dots.push(this.physics.add.sprite(352,  64, 'dot'));
            dots.push(this.physics.add.sprite(480,  64, 'dot'));
            dots.push(this.physics.add.sprite(544,  64, 'dot'));
            dots.push(this.physics.add.sprite(672,  64, 'dot'));
            dots.push(this.physics.add.sprite( 32,  96, 'dot'));
            dots.push(this.physics.add.sprite(160,  96, 'dot'));
            dots.push(this.physics.add.sprite(224,  96, 'dot'));
            dots.push(this.physics.add.sprite(256,  96, 'dot'));
            dots.push(this.physics.add.sprite(288,  96, 'dot'));
            dots.push(this.physics.add.sprite(352,  96, 'dot'));
            dots.push(this.physics.add.sprite(416,  96, 'dot'));
            dots.push(this.physics.add.sprite(448,  96, 'dot'));
            dots.push(this.physics.add.sprite(480,  96, 'dot'));
            dots.push(this.physics.add.sprite(544,  96, 'dot'));
            dots.push(this.physics.add.sprite(672,  96, 'dot'));
            dots.push(this.physics.add.sprite( 32, 128, 'dot'));
            dots.push(this.physics.add.sprite(160, 128, 'dot'));
            dots.push(this.physics.add.sprite(224, 128, 'dot'));
            dots.push(this.physics.add.sprite(288, 128, 'dot'));
            dots.push(this.physics.add.sprite(352, 128, 'dot'));
            dots.push(this.physics.add.sprite(416, 128, 'dot'));
            dots.push(this.physics.add.sprite(480, 128, 'dot'));
            dots.push(this.physics.add.sprite(544, 128, 'dot'));
            dots.push(this.physics.add.sprite(672, 128, 'dot'));
            dots.push(this.physics.add.sprite( 32, 160, 'dot'));
            dots.push(this.physics.add.sprite( 64, 160, 'dot'));
            dots.push(this.physics.add.sprite( 96, 160, 'dot'));
            dots.push(this.physics.add.sprite(128, 160, 'dot'));
            dots.push(this.physics.add.sprite(160, 160, 'dot'));
            dots.push(this.physics.add.sprite(192, 160, 'dot'));
            dots.push(this.physics.add.sprite(224, 160, 'dot'));
            dots.push(this.physics.add.sprite(288, 160, 'dot'));
            dots.push(this.physics.add.sprite(320, 160, 'dot'));
            dots.push(this.physics.add.sprite(352, 160, 'dot'));
            dots.push(this.physics.add.sprite(384, 160, 'dot'));
            dots.push(this.physics.add.sprite(416, 160, 'dot'));
            dots.push(this.physics.add.sprite(480, 160, 'dot'));
            dots.push(this.physics.add.sprite(512, 160, 'dot'));
            dots.push(this.physics.add.sprite(544, 160, 'dot'));
            dots.push(this.physics.add.sprite(576, 160, 'dot'));
            dots.push(this.physics.add.sprite(608, 160, 'dot'));
            dots.push(this.physics.add.sprite(640, 160, 'dot'));
            dots.push(this.physics.add.sprite(672, 160, 'dot'));
            dots.push(this.physics.add.sprite( 32, 192, 'dot'));
            dots.push(this.physics.add.sprite(160, 192, 'dot'));
            dots.push(this.physics.add.sprite(224, 192, 'dot'));
            dots.push(this.physics.add.sprite(352, 192, 'dot'));
            dots.push(this.physics.add.sprite(544, 192, 'dot'));
            dots.push(this.physics.add.sprite(672, 192, 'dot'));
            dots.push(this.physics.add.sprite( 32, 224, 'dot'));
            dots.push(this.physics.add.sprite( 64, 224, 'dot'));
            dots.push(this.physics.add.sprite( 96, 224, 'dot'));
            dots.push(this.physics.add.sprite(128, 224, 'dot'));
            dots.push(this.physics.add.sprite(160, 224, 'dot'));
            dots.push(this.physics.add.sprite(512, 224, 'dot'));
            dots.push(this.physics.add.sprite(544, 224, 'dot'));
            dots.push(this.physics.add.sprite(576, 224, 'dot'));
            dots.push(this.physics.add.sprite(608, 224, 'dot'));
            dots.push(this.physics.add.sprite(672, 224, 'dot'));
            dots.push(this.physics.add.sprite( 32, 256, 'dot'));
            dots.push(this.physics.add.sprite( 96, 256, 'dot'));
            dots.push(this.physics.add.sprite(608, 256, 'dot'));
            dots.push(this.physics.add.sprite(672, 256, 'dot'));
            dots.push(this.physics.add.sprite( 32, 288, 'dot'));
            dots.push(this.physics.add.sprite( 96, 288, 'dot'));
            dots.push(this.physics.add.sprite(128, 288, 'dot'));
            dots.push(this.physics.add.sprite(160, 288, 'dot'));
            dots.push(this.physics.add.sprite(544, 288, 'dot'));
            dots.push(this.physics.add.sprite(576, 288, 'dot'));
            dots.push(this.physics.add.sprite(608, 288, 'dot'));
            dots.push(this.physics.add.sprite(640, 288, 'dot'));
            dots.push(this.physics.add.sprite(672, 288, 'dot'));
            dots.push(this.physics.add.sprite( 32, 320, 'dot'));
            dots.push(this.physics.add.sprite(160, 320, 'dot'));
            dots.push(this.physics.add.sprite(544, 320, 'dot'));
            dots.push(this.physics.add.sprite( 32, 352, 'dot'));
            dots.push(this.physics.add.sprite( 64, 352, 'dot'));
            dots.push(this.physics.add.sprite( 96, 352, 'dot'));
            dots.push(this.physics.add.sprite(128, 352, 'dot'));
            dots.push(this.physics.add.sprite(160, 352, 'dot'));
            dots.push(this.physics.add.sprite(192, 352, 'dot'));
            dots.push(this.physics.add.sprite(512, 352, 'dot'));
            dots.push(this.physics.add.sprite(544, 352, 'dot'));
            dots.push(this.physics.add.sprite(576, 352, 'dot'));
            dots.push(this.physics.add.sprite(608, 352, 'dot'));
            dots.push(this.physics.add.sprite(640, 352, 'dot'));
            dots.push(this.physics.add.sprite(672, 352, 'dot'));
            dots.push(this.physics.add.sprite(160, 384, 'dot'));
            dots.push(this.physics.add.sprite(544, 384, 'dot'));
            dots.push(this.physics.add.sprite(672, 384, 'dot'));
            dots.push(this.physics.add.sprite( 32, 416, 'dot'));
            dots.push(this.physics.add.sprite( 64, 416, 'dot'));
            dots.push(this.physics.add.sprite( 96, 416, 'dot'));
            dots.push(this.physics.add.sprite(128, 416, 'dot'));
            dots.push(this.physics.add.sprite(160, 416, 'dot'));
            dots.push(this.physics.add.sprite(544, 416, 'dot'));
            dots.push(this.physics.add.sprite(576, 416, 'dot'));
            dots.push(this.physics.add.sprite(608, 416, 'dot'));
            dots.push(this.physics.add.sprite(672, 416, 'dot'));
            dots.push(this.physics.add.sprite( 32, 448, 'dot'));
            dots.push(this.physics.add.sprite( 96, 448, 'dot'));
            dots.push(this.physics.add.sprite(608, 448, 'dot'));
            dots.push(this.physics.add.sprite(672, 448, 'dot'));
            dots.push(this.physics.add.sprite( 32, 480, 'dot'));
            dots.push(this.physics.add.sprite( 96, 480, 'dot'));
            dots.push(this.physics.add.sprite(128, 480, 'dot'));
            dots.push(this.physics.add.sprite(160, 480, 'dot'));
            dots.push(this.physics.add.sprite(192, 480, 'dot'));
            dots.push(this.physics.add.sprite(544, 480, 'dot'));
            dots.push(this.physics.add.sprite(576, 480, 'dot'));
            dots.push(this.physics.add.sprite(608, 480, 'dot'));
            dots.push(this.physics.add.sprite(640, 480, 'dot'));
            dots.push(this.physics.add.sprite(672, 480, 'dot'));
            dots.push(this.physics.add.sprite( 32, 512, 'dot'));
            dots.push(this.physics.add.sprite(160, 512, 'dot'));
            dots.push(this.physics.add.sprite(352, 512, 'dot'));
            dots.push(this.physics.add.sprite(480, 512, 'dot'));
            dots.push(this.physics.add.sprite(544, 512, 'dot'));
            dots.push(this.physics.add.sprite(672, 512, 'dot'));
            dots.push(this.physics.add.sprite( 32, 544, 'dot'));
            dots.push(this.physics.add.sprite( 64, 544, 'dot'));
            dots.push(this.physics.add.sprite( 96, 544, 'dot'));
            dots.push(this.physics.add.sprite(128, 544, 'dot'));
            dots.push(this.physics.add.sprite(160, 544, 'dot'));
            dots.push(this.physics.add.sprite(192, 544, 'dot'));
            dots.push(this.physics.add.sprite(224, 544, 'dot'));
            dots.push(this.physics.add.sprite(288, 544, 'dot'));
            dots.push(this.physics.add.sprite(320, 544, 'dot'));
            dots.push(this.physics.add.sprite(352, 544, 'dot'));
            dots.push(this.physics.add.sprite(384, 544, 'dot'));
            dots.push(this.physics.add.sprite(416, 544, 'dot'));
            dots.push(this.physics.add.sprite(480, 544, 'dot'));
            dots.push(this.physics.add.sprite(512, 544, 'dot'));
            dots.push(this.physics.add.sprite(544, 544, 'dot'));
            dots.push(this.physics.add.sprite(576, 544, 'dot'));
            dots.push(this.physics.add.sprite(608, 544, 'dot'));
            dots.push(this.physics.add.sprite(640, 544, 'dot'));
            dots.push(this.physics.add.sprite(672, 544, 'dot'));
            dots.push(this.physics.add.sprite( 32, 576, 'dot'));
            dots.push(this.physics.add.sprite(160, 576, 'dot'));
            dots.push(this.physics.add.sprite(224, 576, 'dot'));
            dots.push(this.physics.add.sprite(288, 576, 'dot'));
            dots.push(this.physics.add.sprite(352, 576, 'dot'));
            dots.push(this.physics.add.sprite(416, 576, 'dot'));
            dots.push(this.physics.add.sprite(480, 576, 'dot'));
            dots.push(this.physics.add.sprite(544, 576, 'dot'));
            dots.push(this.physics.add.sprite(672, 576, 'dot'));
            dots.push(this.physics.add.sprite( 32, 608, 'dot'));
            dots.push(this.physics.add.sprite(160, 608, 'dot'));
            dots.push(this.physics.add.sprite(224, 608, 'dot'));
            dots.push(this.physics.add.sprite(256, 608, 'dot'));
            dots.push(this.physics.add.sprite(288, 608, 'dot'));
            dots.push(this.physics.add.sprite(352, 608, 'dot'));
            dots.push(this.physics.add.sprite(416, 608, 'dot'));
            dots.push(this.physics.add.sprite(448, 608, 'dot'));
            dots.push(this.physics.add.sprite(480, 608, 'dot'));
            dots.push(this.physics.add.sprite(544, 608, 'dot'));
            dots.push(this.physics.add.sprite(672, 608, 'dot'));
            dots.push(this.physics.add.sprite( 32, 640, 'dot'));
            dots.push(this.physics.add.sprite(160, 640, 'dot'));
            dots.push(this.physics.add.sprite(224, 640, 'dot'));
            dots.push(this.physics.add.sprite(352, 640, 'dot'));
            dots.push(this.physics.add.sprite(416, 640, 'dot'));
            dots.push(this.physics.add.sprite(544, 640, 'dot'));
            dots.push(this.physics.add.sprite(672, 640, 'dot'));
            dots.push(this.physics.add.sprite( 32, 672, 'dot'));
            dots.push(this.physics.add.sprite( 64, 672, 'dot'));
            dots.push(this.physics.add.sprite( 96, 672, 'dot'));
            dots.push(this.physics.add.sprite(128, 672, 'dot'));
            dots.push(this.physics.add.sprite(160, 672, 'dot'));
            dots.push(this.physics.add.sprite(192, 672, 'dot'));
            dots.push(this.physics.add.sprite(224, 672, 'dot'));
            dots.push(this.physics.add.sprite(256, 672, 'dot'));
            dots.push(this.physics.add.sprite(288, 672, 'dot'));
            dots.push(this.physics.add.sprite(320, 672, 'dot'));
            dots.push(this.physics.add.sprite(352, 672, 'dot'));
            dots.push(this.physics.add.sprite(416, 672, 'dot'));
            dots.push(this.physics.add.sprite(448, 672, 'dot'));
            dots.push(this.physics.add.sprite(480, 672, 'dot'));
            dots.push(this.physics.add.sprite(512, 672, 'dot'));
            dots.push(this.physics.add.sprite(544, 672, 'dot'));
            dots.push(this.physics.add.sprite(576, 672, 'dot'));
            dots.push(this.physics.add.sprite(608, 672, 'dot'));
            dots.push(this.physics.add.sprite(640, 672, 'dot'));
            dots.push(this.physics.add.sprite(672, 672, 'dot'));
        }

        let style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
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
                yellowDir = {x: 4, y: 0};
                redDir = {x: 0, y: -4};
                greenDir = {x: 0, y: 4};
            }
        } else if (state === 1) {
            if (waitTimer > 0) {
                waitTimer--;
            } else {
                text.text = "";
            }
            blue.x += blueDir.x;
            blue.y += blueDir.y;
            yellow.x += yellowDir.x;
            yellow.y += yellowDir.y;
            red.x += redDir.x;
            red.y += redDir.y;
            green.x += greenDir.x;
            green.y += greenDir.y;
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
            if (yellow.x % 32 === 0 && yellow.y % 32 === 0) {
                if (inputList.yellowUp.isDown) {
                    yellowDir = {x: 0, y: -4};
                } else if (inputList.yellowDown.isDown) {
                    yellowDir = {x: 0, y: 4};
                } else if (inputList.yellowLeft.isDown) {
                    yellowDir = {x: -4, y: 0};
                } else if (inputList.yellowRight.isDown) {
                    yellowDir = {x: 4, y: 0};
                }
            }
            if (red.x % 32 === 0 && red.y % 32 === 0) {
                if (inputList.redUp.isDown) {
                    redDir = {x: 0, y: -4};
                } else if (inputList.redDown.isDown) {
                    redDir = {x: 0, y: 4};
                } else if (inputList.redLeft.isDown) {
                    redDir = {x: -4, y: 0};
                } else if (inputList.redRight.isDown) {
                    redDir = {x: 4, y: 0};
                }
            }
            if (green.x % 32 === 0 && green.y % 32 === 0) {
                if (inputList.greenUp.isDown) {
                    greenDir = {x: 0, y: -4};
                } else if (inputList.greenDown.isDown) {
                    greenDir = {x: 0, y: 4};
                } else if (inputList.greenLeft.isDown) {
                    greenDir = {x: -4, y: 0};
                } else if (inputList.greenRight.isDown) {
                    greenDir = {x: 4, y: 0};
                }
            }
        } else if (state === 2) {
            blueDir = {x: 0, y: 0};
            yellowDir = {x: 0, y: 0};
            redDir = {x: 0, y: 0};
            greenDir = {x: 0, y: 0};
            if (blueScore > yellowScore && blueScore > redScore && blueScore > greenScore) {
                text.text = "Blue wins!\n\nB:"+blueScore+"  Y:"+yellowScore+"  R:"+redScore+"  G:"+greenScore;
            } else if (yellowScore > blueScore && yellowScore > redScore && yellowScore > greenScore) {
                text.text = "Yellow wins!\n\nB:"+blueScore+"  Y:"+yellowScore+"  R:"+redScore+"  G:"+greenScore;
            } else if (redScore > blueScore && redScore > yellowScore && redScore > greenScore) {
                text.text = "Red wins!\n\nB:"+blueScore+"  Y:"+yellowScore+"  R:"+redScore+"  G:"+greenScore;
            } else if (greenScore > blueScore && greenScore > yellowScore && greenScore > redScore) {
                text.text = "Green wins!\n\nB:"+blueScore+"  Y:"+yellowScore+"  R:"+redScore+"  G:"+greenScore;
            } else {
                text.text = "Tie!\n\nB:"+blueScore+"  Y:"+yellowScore+"  R:"+redScore+"  G:"+greenScore;
            }
        }
    }

    blueHitWall(blue, wall) {
        // depenetrate and stop moving
        blue.x -= blueDir.x;
        blue.y -= blueDir.y;
        blueDir = {x: 0, y: 0};
    }

    yellowHitWall(yellow, wall) {
        // depenetrate and stop moving
        yellow.x -= yellowDir.x;
        yellow.y -= yellowDir.y;
        yellowDir = {x: 0, y: 0};
    }

    redHitWall(red, wall) {
        // depenetrate and stop moving
        red.x -= redDir.x;
        red.y -= redDir.y;
        redDir = {x: 0, y: 0};
    }

    greenHitWall(green, wall) {
        // depenetrate and stop moving
        green.x -= greenDir.x;
        green.y -= greenDir.y;
        greenDir = {x: 0, y: 0};
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

    yellowAteDot(yellow, dot) {
        dot.body.enable = false;
        dot.visible = false;
        dotsLeft--;
        yellowScore++;
        if (dotsLeft === 0) {
            state = 2;
        }
    }

    redAteDot(red, dot) {
        dot.body.enable = false;
        dot.visible = false;
        dotsLeft--;
        redScore++;
        if (dotsLeft === 0) {
            state = 2;
        }
    }

    greenAteDot(green, dot) {
        dot.body.enable = false;
        dot.visible = false;
        dotsLeft--;
        greenScore++;
        if (dotsLeft === 0) {
            state = 2;
        }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 704,
    height: 704,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
