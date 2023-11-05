let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    // width: 1334,
    // height: 750,
    render: {
        pixelArt: true
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },
    // spawnRange: [80,300],
    // platformSpeedRange:[300,300],
    // landSizeRange:[32*5,960/4],
    // heightRange:[-5,5],
    // platformVerticalLimit: [0.4,0.8],
    //heightRange:[32,500],
    scene:[Menu, Play]
}
let downFlag = false;
let game = new Phaser.Game(config);
let { height, width } = game.config;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let keySPACE, keyENTER, keyF;