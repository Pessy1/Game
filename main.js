'use strict'
const Game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, 'game-canvas', { 
    preload:preload, 
    create:create, 
    update:update })

let pl
let music,footstep,jumpsound,counter = 0
let speed = 150
let plat
let jumpTimer = 0
let direction = 'right'

function preload() {
    Game.load.spritesheet ('player','Untitled-3 (1).png',800/8,480/6)
    Game.load.audio('music', "Naruto Theme - The Raising Fighting Spirit (320  kbps).mp3")
    Game.load.audio("jumpsound", "Jump.wav")
    Game.load.audio("footstep", "Footstep1.wav")
    Game.load.image ('platform','download (1).png')
}

function create() {
    musicandsound ()
    plat=Game.add.sprite (window.innerWidth,window.innerHeight,'platform')
    plat.anchor.setTo(1,1)
    plat.width = window.innerWidth
    playerf ()
    plAnim ()
    Game.stage.backgroundColor = "#4488AA"

}

function update() {
    playermovment()
}

const musicandsound = function () {
    music = Game.add.audio('music',0.1);

    music.play();

    footstep = Game.add.audio('footstep',1)
    jumpsound = Game.add.audio('jumpsound',1)
    
}

const playerf = function () {
    
    pl=Game.add.sprite (100,100,'player')
    pl.scale.setTo(3)
    Game.physics.enable (pl)
    pl.body.collideWorldBounds = true
    pl.body.gravity.y = 400
}

const plAnim = function() {
    pl.animations.add('Idle',[0,1,2,3,4,5],8,true)
    pl.animations.add('Idle_left', [31,30,29,28,27,26],8,true)
    pl.animations.add('Running',[8,9,10,11,12,13,14],10)
    pl.animations.add('Running_left',[39,38,37,36,35,34,32],10)
    pl.animations.add('Jump',[19,20,21],10)
    pl.animations.add('Jump_left',[44,43,42],10)
}

const playermovment = function (){
    pl.body.velocity.x=0

    if (Game.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
        pl.body.velocity.x=-speed
        pl.animations.play('Running_left')
        direction = 'left'
    }else if (Game.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
        pl.body.velocity.x = +speed
        pl.animations.play('Running')
        direction = 'right'
    }else if(direction === 'right'){
        (pl.animations.play('Idle'))
    }else if (direction === 'left'){
        pl.animations.play('Idle_left')
    }
    if (Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && pl.body.onFloor() && Game.time.now > jumpTimer)
    {
        pl.body.velocity.y = -450;
        jumpTimer = Game.time.now + 750;
    }
    if (pl.body.onFloor() === false){
        if(direction === 'right'){
            (pl.animations.play('Jump'))
        }else if (direction === 'left'){
            pl.animations.play('Jump_left')
        }
    }

    // Jump!
    

    Game.physics.arcade.collide (pl,plat)
    }
