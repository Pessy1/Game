'use strict'
const Game = new Phaser.Game(800, 800, Phaser.AUTO, 'game-canvas', { preload, create, update })

function preload() {
    Game.load.audio('music', "Naruto Theme - The Raising Fighting Spirit (320  kbps).mp3")
}

function create() {
    musicandsound ()
}

function update() {

}

const musicandsound = function () {
    music = Game.add.audio('music');

    music.play();
    
}