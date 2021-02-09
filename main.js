'use strict'
const Game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, 'game-canvas', { 
    preload:preload, 
    create:create, 
    update:update })

let pl
let music,footstep,jumpsound,counter = 0
let speed = 20
let plat

function preload() {
    Game.load.spritesheet ('player','Untitled-3.png',800/8,480/6)
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
    pl.body.gravity.y = 100
}

const plAnim = function() {
    pl.animations.add('Idle',[0,1,2,3,4,5],8,true)
    pl.animations.add('Running',[8,9,10,11,12,13,14],10)
    pl.animations.add('Running_left',[31,32,32,33,34,35,36,0],10)
    pl.animations.add('Jump',[20,21,22,23],10)
}

const playermovment = function (){
    pl.body.velocity.x=0

    if (Game.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
        pl.body.velocity.x=-speed
        pl.animations.play('Running_left')
    }else if (Game.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
        pl.body.velocity.x = +speed
        pl.animations.play('Running')
    }else if (Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown){
        pl.body.velocity.y = -speed
        pl.animations.play('Jump')
    }else (pl.animations.play('Idle'))
    
    if (pl.onTheGround) {
        pl.jumps = 2;
        pl.jumping = false;
    }

    // Jump!
    if (pl.jumps > 0 && pl.upInputIsActive(5)) {
        pl.body.velocity.y = pl.JUMP_SPEED;
        pl.jumping = true;
    }

    if (pl.jumping && Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isUp) {
        pl.jumps--;
        pl.jumping = false;
    }

    Game.physics.arcade.collide (pl,plat)
}