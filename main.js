'use strict'
const Game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, 'game-canvas', { 
    preload:preload, 
    create:create, 
    update:update })

let pl
let music,footstep,jumpsound,counter = 0
let speed = 250
let plat
let jumpTimer = 0
let direction = 'right'
let healthbar
let healthbar_enemy
let enemy
let heal

function preload() {
    Game.load.spritesheet ('player','Untitled-3 (1).png',800/8,480/6)
    Game.load.audio('music', "Naruto Theme - The Raising Fighting Spirit (320  kbps).mp3")
    Game.load.audio("jumpsound", "Jump.wav")
    Game.load.audio("footstep", "Footstep1.wav")
    Game.load.image ('platform','download (1).png')
    Game.load.image('blue', 'blue.png')
    Game.load.image('ball', 'heal.png')
    Game.load.image('healthbar', 'platform.jpg')
}

function create() {
    musicandsound ()
    plat=Game.add.sprite (window.innerWidth,window.innerHeight,'platform')
    plat.anchor.setTo(1,1)
    plat.width = window.innerWidth
    playerf ()
    plAnim ()
    enemy_create()
    enemy_phys()

    heal = Game.add.sprite(enemy.x, enemy.y, 'ball')
    heal.scale.setTo(0.05)
    heal.kill()
    Game.physics.arcade.enable(heal)

    healthbar = Game.add.sprite(0,0,'healthbar')
    healthbar.width = pl.health
    healthbar.scale.setTo(0.05)
    healthbar.anchor.setTo(0.5, 1)

    healthbar_enemy = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy.width = enemy.health
    healthbar_enemy.scale.setTo(0.05)
    healthbar_enemy.anchor.setTo(0.5, 1)

    Game.stage.backgroundColor = "#4488AA"

}

function update() {
    playermovment()

    if (pl.visible && enemy.visible){
        damage()
        death()
    }

    if (pl.visible && heal.visible){
        Game.physics.arcade.moveToObject(heal, player, 500)
        healing()
    }

    healthbar.width = pl.health

    healthbar.x = pl.x+pl.width/2
    healthbar.y = pl.y+10

    healthbar_enemy.width = enemy.health

    healthbar_enemy.x = enemy.x+enemy.width/2
    healthbar_enemy.y = enemy.y-5
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
    pl.health = 80
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

const death = function() {
    if (pl.health < 0){
        healthbar.destroy()
        pl.kill()
    }
    if (enemy.health < 0){
        healthbar_enemy.destroy()
        enemy.kill()
        heal.revive()
        heal.x = enemy.x
        heal.y = enemy.y
    }
}
    
const damage = function() {
    if (pl.overlap(enemy)){
        pl.health -= 1
    }
}
    
const healing = function() {
    if (pl.overlap(heal)){
        pl.health += 10
        heal.kill()
    }    
}
        
    