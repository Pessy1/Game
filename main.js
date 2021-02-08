'use strict'
const Game = new Phaser.Game(800, 800, Phaser.AUTO, 'game-canvas', { preload, create, update })

let pl
let music
let button
let A,D
let speed = 20

function preload() {
    Game.load.spritesheet ('Idle_Animation','Untitled-2.png',11748/6.09,4026/1)
    Game.load.audio('music', "Naruto Theme - The Raising Fighting Spirit (320  kbps).mp3")
}

function create() {
    musicandsound ()
    playerf ()
}

function update() {
    playermovment()
}

const musicandsound = function () {
    music = Game.add.audio('music');

    music.play();
    
}

const playerf = function () {
    pl = Game.add.sprite(100,100,'Idle_Animation')
    pl.scale.setTo(0.05)
    pl.animations.add ('Idle.Animation',[0,1,2,3,4,5],6,true).play()
    Game.physics.enable (pl)
    pl.body
}

const playermovment = function (){
    pl.body.velocity.x=0
    if (Game.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
        pl.body.velocity.x = +speed
    }
    if (Game.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
        pl.body.velocity.x=-speed
    }
}