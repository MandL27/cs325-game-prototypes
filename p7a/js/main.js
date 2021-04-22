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

var player;
var keyCount = 1;
var doors = [];
var keys = [];
var locks = [];
var playerPos = {x: 0, y: 0};
var rooms = [
    [
        [
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId:  0},
            {hasLock:  true, doorId:  1},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId:  1},
            {hasLock:  true, doorId:  8},
            {hasLock:  true, doorId:  2},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId:  2},
            {hasLock:  true, doorId:  3},
            {hasLock: false, doorId: -1},
        ]
    ],
    [
        [
            {hasLock:  true, doorId:  0},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId:  4},
            {hasLock:  true, doorId:  9},
        ],
        [
            {hasLock:  true, doorId:  8},
            {hasLock:  true, doorId:  9},
            {hasLock: false, doorId:  5},
            {hasLock: false, doorId: -1},
        ],
        [
            {hasLock: false, doorId:  3},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId:  6},
            {hasLock: false, doorId: -1},
        ]
    ],
    [
        [
            {hasLock: false, doorId:  4},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId:  7},
        ],
        [
            {hasLock:  true, doorId:  5},
            {hasLock: false, doorId:  7},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: -1},
        ],
        [
            {hasLock: false, doorId:  6},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: -1},
        ]
    ]
];
var doorFlags = [false, false, false, false, false, false, false, false, false];
var keyFlags = [false, false];
var inputList;
var keyText;
var timeText;
var winText;
var frames = 0;
var won = false;

class MyScene extends Phaser.Scene {

    constructor() {
        super();
    }
    
    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('key', 'assets/key.png');
        this.load.image('door', 'assets/door.png');
        inputList = this.input.keyboard.addKeys({
            up: 'up', left: 'left', down: 'down', right: 'right',
            keyUp: 'W', keyDown: 'S', keyLeft: 'A', keyRight: 'D'
        });
    }
    
    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'bg');
        
        player = this.physics.add.sprite(96, 96, 'player');

        keys[0] = this.physics.add.sprite(384,  96, 'key');
        keys[1] = this.physics.add.sprite(384, 672, 'key');

        locks[0] = this.physics.add.sprite( 96, 264, 'key');
        locks[0].setTint(0x707070);
        locks[1] = this.physics.add.sprite(216,  96, 'key');
        locks[1].setTint(0x707070);
        locks[2] = this.physics.add.sprite(504,  96, 'key');
        locks[2].setTint(0x707070);
        locks[3] = this.physics.add.sprite(672, 216, 'key');
        locks[3].setTint(0x707070);
        locks[4] = this.physics.add.sprite( 96, 504, 'key');
        locks[4].setTint(0x707070);
        locks[5] = this.physics.add.sprite(384, 552, 'key');
        locks[5].setTint(0x707070);
        locks[6] = this.physics.add.sprite(672, 504, 'key');
        locks[6].setTint(0x707070);
        locks[7] = this.physics.add.sprite(216, 672, 'key');
        locks[7].setTint(0x707070);
        locks[8] = this.physics.add.sprite(384, 240, 'key');
        locks[8].setTint(0x707070);
        locks[8].scaleY = 2;
        locks[9] = this.physics.add.sprite(240, 384, 'key');
        locks[9].setTint(0x707070);
        locks[9].scaleX = 2;

        doors[0] = this.physics.add.sprite( 96, 240, 'door');
        doors[0].scaleX = 2;
        doors[1] = this.physics.add.sprite(240,  96, 'door');
        doors[1].scaleY = 2;
        doors[2] = this.physics.add.sprite(528,  96, 'door');
        doors[2].scaleY = 2;
        doors[3] = this.physics.add.sprite(672, 240, 'door');
        doors[3].scaleX = 2;
        doors[4] = this.physics.add.sprite( 96, 528, 'door');
        doors[4].scaleX = 2;
        doors[5] = this.physics.add.sprite(384, 528, 'door');
        doors[5].scaleX = 2;
        doors[6] = this.physics.add.sprite(672, 528, 'door');
        doors[6].scaleX = 2;
        doors[7] = this.physics.add.sprite(240, 672, 'door');
        doors[7].scaleY = 2;
        doors[8] = this.physics.add.sprite(384, 240, 'door');
        doors[8].scaleX = 2;
        doors[9] = this.physics.add.sprite(240, 384, 'door');
        doors[9].scaleY = 2;

        var style = {font: "25px Verdana", fill: "#000000", align: "left"};
        keyText = this.add.text(0, 0, "Keys: 1", style);
        timeText = this.add.text(650, 0, "00:00.00", style);
        winText = this.add.text(660, 740, "You win!", style); 
        winText.visible = false; 

        inputList.up.on('down', function(event) {
            if (playerPos.y != 0 && doorFlags[rooms[playerPos.y][playerPos.x][0].doorId]) {
                playerPos.y--;
                player.y -= 288;
            }
        });
        inputList.left.on('down', function(event) {
            if (playerPos.x != 0 && doorFlags[rooms[playerPos.y][playerPos.x][1].doorId]) {
                playerPos.x--;
                player.x -= 288;
            }
        });
        inputList.down.on('down', function(event) {
            if (playerPos.y != 2 && doorFlags[rooms[playerPos.y][playerPos.x][2].doorId]) {
                playerPos.y++;
                player.y += 288;
            }
        });
        inputList.right.on('down', function(event) {
            if (playerPos.x != 2 && doorFlags[rooms[playerPos.y][playerPos.x][3].doorId]) {
                playerPos.x++;
                player.x += 288;
            }
        });
        inputList.keyUp.on('down', function(event) {
            if (playerPos.y != 0 && rooms[playerPos.y][playerPos.x][0].hasLock) {
                if (doorFlags[rooms[playerPos.y][playerPos.x][0].doorId]) {
                    keyCount++;
                    locks[rooms[playerPos.y][playerPos.x][0].doorId].setTint(0x707070);
                    doors[rooms[playerPos.y][playerPos.x][0].doorId].visible = true;
                    doorFlags[rooms[playerPos.y][playerPos.x][0].doorId] = false;
                } else if (keyCount > 0) {
                    keyCount--;
                    locks[rooms[playerPos.y][playerPos.x][0].doorId].setTint(0xffffff);
                    doors[rooms[playerPos.y][playerPos.x][0].doorId].visible = false;
                    doorFlags[rooms[playerPos.y][playerPos.x][0].doorId] = true;
                }
            }
        });
        inputList.keyLeft.on('down', function(event) {
            if (playerPos.x != 0 && rooms[playerPos.y][playerPos.x][1].hasLock) {
                if (doorFlags[rooms[playerPos.y][playerPos.x][1].doorId]) {
                    keyCount++;
                    locks[rooms[playerPos.y][playerPos.x][1].doorId].setTint(0x707070);
                    doors[rooms[playerPos.y][playerPos.x][1].doorId].visible = true;
                    doorFlags[rooms[playerPos.y][playerPos.x][1].doorId] = false;
                } else if (keyCount > 0) {
                    keyCount--;
                    locks[rooms[playerPos.y][playerPos.x][1].doorId].setTint(0xffffff);
                    doors[rooms[playerPos.y][playerPos.x][1].doorId].visible = false;
                    doorFlags[rooms[playerPos.y][playerPos.x][1].doorId] = true;
                }
            }
        });
        inputList.keyDown.on('down', function(event) {
            if (playerPos.y != 2 && rooms[playerPos.y][playerPos.x][2].hasLock) {
                if (doorFlags[rooms[playerPos.y][playerPos.x][2].doorId]) {
                    keyCount++;
                    locks[rooms[playerPos.y][playerPos.x][2].doorId].setTint(0x707070);
                    doors[rooms[playerPos.y][playerPos.x][2].doorId].visible = true;
                    doorFlags[rooms[playerPos.y][playerPos.x][2].doorId] = false;
                } else if (keyCount > 0) {
                    keyCount--;
                    locks[rooms[playerPos.y][playerPos.x][2].doorId].setTint(0xffffff);
                    doors[rooms[playerPos.y][playerPos.x][2].doorId].visible = false;
                    doorFlags[rooms[playerPos.y][playerPos.x][2].doorId] = true;
                }
            }
        });
        inputList.keyRight.on('down', function(event) {
            if (playerPos.x != 2 && rooms[playerPos.y][playerPos.x][3].hasLock) {
                if (doorFlags[rooms[playerPos.y][playerPos.x][3].doorId]) {
                    keyCount++;
                    locks[rooms[playerPos.y][playerPos.x][3].doorId].setTint(0x707070);
                    doors[rooms[playerPos.y][playerPos.x][3].doorId].visible = true;
                    doorFlags[rooms[playerPos.y][playerPos.x][3].doorId] = false;
                } else if (keyCount > 0) {
                    keyCount--;
                    locks[rooms[playerPos.y][playerPos.x][3].doorId].setTint(0xffffff);
                    doors[rooms[playerPos.y][playerPos.x][3].doorId].visible = false;
                    doorFlags[rooms[playerPos.y][playerPos.x][3].doorId] = true;
                }
            }
        });
        
    }
    
    update() {
        if (playerPos.x == 2 && playerPos.y == 2 && !won) {
            won = true;
            winText.visible = true;
        }
        if (!won) {
            frames++;
            keyText.text = "Keys: " + keyCount;
            if (frames > 360039) {
                timeText.text = "99:59.99"
            } else {
                timeText.text = ("00" + Math.floor(frames / 3600)).slice(-2) + ":" + ("00" + Math.floor((frames % 3600) / 60)).slice(-2) + "." + ("00" + Math.floor(6000 / (frames % 60))).slice(-2);
            }

            if (playerPos.x == 1 && playerPos.y == 0 && !keyFlags[0]) {
                keyFlags[0] = true;
                keys[0].visible = false;
                keyCount++;
            }
            if (playerPos.x == 1 && playerPos.y == 2 && !keyFlags[1]) {
                keyFlags[1] = true;
                keys[1].visible = false;
                keyCount++;
            }
        }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 768,
    height: 768,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
