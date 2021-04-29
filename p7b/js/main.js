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
            {hasLock:  true, doorId:  3},
            {hasLock:  true, doorId:  0},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId:  0},
            {hasLock:  true, doorId:  4},
            {hasLock: false, doorId: -1},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId:  5},
            {hasLock:  true, doorId:  1},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId:  1},
            {hasLock:  true, doorId:  6},
            {hasLock:  true, doorId:  2},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId:  2},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: -1},
        ]
    ],
    [
        [
            {hasLock: false, doorId:  3},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 11},
            {hasLock:  true, doorId:  7},
        ],
        [
            {hasLock:  true, doorId:  4},
            {hasLock:  true, doorId:  7},
            {hasLock: false, doorId: 12},
            {hasLock:  true, doorId:  8},
        ],
        [
            {hasLock:  true, doorId:  5},
            {hasLock: false, doorId:  8},
            {hasLock:  true, doorId: 13},
            {hasLock: false, doorId:  9},
        ],
        [
            {hasLock: false, doorId:  6},
            {hasLock:  true, doorId:  9},
            {hasLock:  true, doorId: 14},
            {hasLock: false, doorId: 10},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 10},
            {hasLock: false, doorId: 15},
            {hasLock: false, doorId: -1},
        ]
    ],
    [
        [
            {hasLock: false, doorId: 11},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: 20},
            {hasLock:  true, doorId: 16},
        ],
        [
            {hasLock:  true, doorId: 12},
            {hasLock: false, doorId: 16},
            {hasLock:  true, doorId: 21},
            {hasLock:  true, doorId: 17},
        ],
        [
            {hasLock:  true, doorId: 13},
            {hasLock:  true, doorId: 17},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 18},
        ],
        [
            {hasLock: false, doorId: 14},
            {hasLock: false, doorId: 18},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 19},
        ],
        [
            {hasLock:  true, doorId: 15},
            {hasLock: false, doorId: 19},
            {hasLock:  true, doorId: 22},
            {hasLock: false, doorId: -1},
        ]
    ],
    [
        [
            {hasLock:  true, doorId: 20},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 27},
            {hasLock: false, doorId: 23},
        ],
        [
            {hasLock: false, doorId: 21},
            {hasLock:  true, doorId: 23},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 24},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 24},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 25},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 25},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 26},
        ],
        [
            {hasLock: false, doorId: 22},
            {hasLock:  true, doorId: 26},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: -1},
        ]
    ],
    [
        [
            {hasLock:  true, doorId: 27},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 28},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: 28},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 29},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: 29},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 30},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: 30},
            {hasLock: false, doorId: -1},
            {hasLock:  true, doorId: 31},
        ],
        [
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: 31},
            {hasLock: false, doorId: -1},
            {hasLock: false, doorId: -1},
        ]
    ]
];
var doorFlags = [
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false
];
var keyFlags = [false, false, false, false];
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
        
        player = this.physics.add.sprite(64, 64, 'player');

        keys[0] = this.physics.add.sprite(832,  64, 'key');
        keys[1] = this.physics.add.sprite(832, 256, 'key');
        keys[2] = this.physics.add.sprite( 64, 448, 'key');
        keys[3] = this.physics.add.sprite( 64, 640, 'key');

        locks[0] = this.physics.add.sprite(160,  64, 'key');
        locks[0].setTint(0x707070);
        locks[0].scaleX = 2;
        locks[1] = this.physics.add.sprite(544,  64, 'key');
        locks[1].setTint(0x707070);
        locks[1].scaleX = 2;
        locks[2] = this.physics.add.sprite(720,  64, 'key');
        locks[2].setTint(0x707070);
        locks[3] = this.physics.add.sprite( 64, 144, 'key');
        locks[3].setTint(0x707070);
        locks[4] = this.physics.add.sprite(256, 160, 'key');
        locks[4].setTint(0x707070);
        locks[4].scaleY = 2;
        locks[5] = this.physics.add.sprite(448, 176, 'key');
        locks[5].setTint(0x707070);
        locks[6] = this.physics.add.sprite(640, 144, 'key');
        locks[6].setTint(0x707070);
        locks[7] = this.physics.add.sprite(160, 256, 'key');
        locks[7].setTint(0x707070);
        locks[7].scaleX = 2;
        locks[8] = this.physics.add.sprite(336, 256, 'key');
        locks[8].setTint(0x707070);
        locks[9] = this.physics.add.sprite(560, 256, 'key');
        locks[9].setTint(0x707070);
        locks[10] = this.physics.add.sprite(752, 256, 'key');
        locks[10].setTint(0x707070);
        locks[11] = this.physics.add.sprite( 64, 336, 'key');
        locks[11].setTint(0x707070);
        locks[12] = this.physics.add.sprite(256, 368, 'key');
        locks[12].setTint(0x707070);
        locks[13] = this.physics.add.sprite(448, 352, 'key');
        locks[13].setTint(0x707070);
        locks[13].scaleY = 2;
        locks[14] = this.physics.add.sprite(640, 336, 'key');
        locks[14].setTint(0x707070);
        locks[15] = this.physics.add.sprite(832, 368, 'key');
        locks[15].setTint(0x707070);
        locks[16] = this.physics.add.sprite(144, 448, 'key');
        locks[16].setTint(0x707070);
        locks[17] = this.physics.add.sprite(352, 448, 'key');
        locks[17].setTint(0x707070);
        locks[17].scaleX = 2;
        locks[18] = this.physics.add.sprite(528, 448, 'key');
        locks[18].setTint(0x707070);
        locks[19] = this.physics.add.sprite(720, 448, 'key');
        locks[19].setTint(0x707070);
        locks[20] = this.physics.add.sprite( 64, 560, 'key');
        locks[20].setTint(0x707070);
        locks[21] = this.physics.add.sprite(256, 528, 'key');
        locks[21].setTint(0x707070);
        locks[22] = this.physics.add.sprite(832, 528, 'key');
        locks[22].setTint(0x707070);
        locks[23] = this.physics.add.sprite(176, 640, 'key');
        locks[23].setTint(0x707070);
        locks[24] = this.physics.add.sprite(352, 640, 'key');
        locks[24].setTint(0x707070);
        locks[24].scaleX = 2;
        locks[25] = this.physics.add.sprite(544, 640, 'key');
        locks[25].setTint(0x707070);
        locks[25].scaleX = 2;
        locks[26] = this.physics.add.sprite(736, 640, 'key');
        locks[26].setTint(0x707070);
        locks[26].scaleX = 2;
        locks[27] = this.physics.add.sprite( 64, 736, 'key');
        locks[27].setTint(0x707070);
        locks[27].scaleY = 2;
        locks[28] = this.physics.add.sprite(144, 832, 'key');
        locks[28].setTint(0x707070);
        locks[29] = this.physics.add.sprite(336, 832, 'key');
        locks[29].setTint(0x707070);
        locks[30] = this.physics.add.sprite(528, 832, 'key');
        locks[30].setTint(0x707070);
        locks[31] = this.physics.add.sprite(720, 832, 'key');
        locks[31].setTint(0x707070);

        doors[0] = this.physics.add.sprite(160,  64, 'door');
        doors[0].scaleY = 2;
        doors[1] = this.physics.add.sprite(544,  64, 'door');
        doors[1].scaleY = 2;
        doors[2] = this.physics.add.sprite(736,  64, 'door');
        doors[2].scaleY = 2;
        doors[3] = this.physics.add.sprite( 64, 160, 'door');
        doors[3].scaleX = 2;
        doors[4] = this.physics.add.sprite(256, 160, 'door');
        doors[4].scaleX = 2;
        doors[5] = this.physics.add.sprite(448, 160, 'door');
        doors[5].scaleX = 2;
        doors[6] = this.physics.add.sprite(640, 160, 'door');
        doors[6].scaleX = 2;
        doors[7] = this.physics.add.sprite(160, 256, 'door');
        doors[7].scaleY = 2;
        doors[8] = this.physics.add.sprite(352, 256, 'door');
        doors[8].scaleY = 2;
        doors[9] = this.physics.add.sprite(544, 256, 'door');
        doors[9].scaleY = 2;
        doors[10] = this.physics.add.sprite(736, 256, 'door');
        doors[10].scaleY = 2;
        doors[11] = this.physics.add.sprite( 64, 352, 'door');
        doors[11].scaleX = 2;
        doors[12] = this.physics.add.sprite(256, 352, 'door');
        doors[12].scaleX = 2;
        doors[13] = this.physics.add.sprite(448, 352, 'door');
        doors[13].scaleX = 2;
        doors[14] = this.physics.add.sprite(640, 352, 'door');
        doors[14].scaleX = 2;
        doors[15] = this.physics.add.sprite(832, 352, 'door');
        doors[15].scaleX = 2;
        doors[16] = this.physics.add.sprite(160, 448, 'door');
        doors[16].scaleY = 2;
        doors[17] = this.physics.add.sprite(352, 448, 'door');
        doors[17].scaleY = 2;
        doors[18] = this.physics.add.sprite(544, 448, 'door');
        doors[18].scaleY = 2;
        doors[19] = this.physics.add.sprite(736, 448, 'door');
        doors[19].scaleY = 2;
        doors[20] = this.physics.add.sprite( 64, 544, 'door');
        doors[20].scaleX = 2;
        doors[21] = this.physics.add.sprite(256, 544, 'door');
        doors[21].scaleX = 2;
        doors[22] = this.physics.add.sprite(832, 544, 'door');
        doors[22].scaleX = 2;
        doors[23] = this.physics.add.sprite(160, 640, 'door');
        doors[23].scaleY = 2;
        doors[24] = this.physics.add.sprite(352, 640, 'door');
        doors[24].scaleY = 2;
        doors[25] = this.physics.add.sprite(544, 640, 'door');
        doors[25].scaleY = 2;
        doors[26] = this.physics.add.sprite(736, 640, 'door');
        doors[26].scaleY = 2;
        doors[27] = this.physics.add.sprite( 64, 736, 'door');
        doors[27].scaleX = 2;
        doors[28] = this.physics.add.sprite(160, 832, 'door');
        doors[28].scaleY = 2;
        doors[29] = this.physics.add.sprite(352, 832, 'door');
        doors[29].scaleY = 2;
        doors[30] = this.physics.add.sprite(544, 832, 'door');
        doors[30].scaleY = 2;
        doors[31] = this.physics.add.sprite(736, 832, 'door');
        doors[31].scaleY = 2;

        var style = {font: "25px Verdana", fill: "#000000", align: "left"};
        keyText = this.add.text(0, 0, "Keys: 1", style);
        timeText = this.add.text(778, 0, "00:00.00", style);
        winText = this.add.text(788, 868, "You win!", style); 
        winText.visible = false; 

        inputList.up.on('down', function(event) {
            if (playerPos.y != 0 && doorFlags[rooms[playerPos.y][playerPos.x][0].doorId]) {
                playerPos.y--;
                player.y -= 192;
            }
        });
        inputList.left.on('down', function(event) {
            if (playerPos.x != 0 && doorFlags[rooms[playerPos.y][playerPos.x][1].doorId]) {
                playerPos.x--;
                player.x -= 192;
            }
        });
        inputList.down.on('down', function(event) {
            if (playerPos.y != 4 && doorFlags[rooms[playerPos.y][playerPos.x][2].doorId]) {
                playerPos.y++;
                player.y += 192;
            }
        });
        inputList.right.on('down', function(event) {
            if (playerPos.x != 4 && doorFlags[rooms[playerPos.y][playerPos.x][3].doorId]) {
                playerPos.x++;
                player.x += 192;
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
            if (playerPos.y != 4 && rooms[playerPos.y][playerPos.x][2].hasLock) {
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
            if (playerPos.x != 4 && rooms[playerPos.y][playerPos.x][3].hasLock) {
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
        if (playerPos.x == 4 && playerPos.y == 4 && !won) {
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

            if (playerPos.x == 4 && playerPos.y == 0 && !keyFlags[0]) {
                keyFlags[0] = true;
                keys[0].visible = false;
                keyCount++;
            }
            if (playerPos.x == 4 && playerPos.y == 1 && !keyFlags[1]) {
                keyFlags[1] = true;
                keys[1].visible = false;
                keyCount++;
            }
            if (playerPos.x == 0 && playerPos.y == 2 && !keyFlags[2]) {
                keyFlags[2] = true;
                keys[2].visible = false;
                keyCount++;
            }
            if (playerPos.x == 0 && playerPos.y == 3 && !keyFlags[3]) {
                keyFlags[3] = true;
                keys[3].visible = false;
                keyCount++;
            }
        }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'game',
    width: 896,
    height: 896,
    scene: MyScene,
    physics: { default: 'arcade' },
    });
