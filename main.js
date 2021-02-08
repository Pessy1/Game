'use strict'
const Game = new Phaser.Game(800, 800, Phaser.AUTO, 'game-canvas', { preload, create, update })

let pl
let music

function preload() {
    Game.load.spritesheet ('Idle_Animation','Untitled-2.png',11748/6.09,4026/1)
    Game.load.audio('music', "Naruto Theme - The Raising Fighting Spirit (320  kbps).mp3")
}

function create() {
    musicandsound ()
    pl = Game.add.sprite(100,100,'Idle_Animation')
    pl.scale.setTo(0.1)
    pl.animations.add ('Idle.Animation',[0,1,2,3,4,5],6,true).play()
}

function update() {

}

const musicandsound = function () {
    music = Game.add.audio('music');

    music.play();
    
}