'use strict'
const Game = new Phaser.Game(800, 800, Phaser.AUTO, 'game-canvas', { preload, create, update })

let pl

function preload() {
    Game.load.spritesheet ('player','Untitled-2.png',11748/6.09,4026/1)
}

function create() {
    pl=Game.add.sprite (100,100,'player')
    pl.animations.add ('',[0,1,2,3,4,5,6],8,true).play()
    pl.scale.setTo(0.1)
}

function update() {

}