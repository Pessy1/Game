'use strict'
const Game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, 'game-canvas', { 
    preload:preload, 
    create:create, 
    update:update })

let pl
let music
let speed = 20
let anim = false
let counter = 0
function preload() {
    Game.load.spritesheet ('player','Untitled-2.png',800/8,240/3)
    Game.load.audio('music', "Naruto Theme - The Raising Fighting Spirit (320  kbps).mp3")
}

function create() {
    musicandsound ()
    playerf ()
    plAnim ()
    console.log(window)
    Game.stage.backgroundColor = "#4488AA"
    console.log(pl.animations)
}

function update() {
    playermovment()
}

const musicandsound = function () {
    music = Game.add.audio('music');

    music.play();
    
}

const playerf = function () {
    
    pl=Game.add.sprite (100,100,'player')
    pl.scale.setTo(3)
    Game.physics.enable (pl)
}

const plAnim = function() {
    pl.animations.add('Idle',[0,1,2,3,4,5],8,true)
    pl.animations.add('Start_Running',[6,7,8],10,false)
    pl.animations.add('Running',[5,6,7,8,9,10,11,12,13,14],10,true)
}

const playermovment = function (){
    pl.body.velocity.x=0
    pl.animations.play('Idle')
    if (Game.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
        pl.body.velocity.x = +speed
        pl.animations.play('Running')
        // pl.animations.stop('Idle')
    }

    if (Game.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
        pl.body.velocity.x=-speed
    }
    
}