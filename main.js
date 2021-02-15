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
let shot_counter = 0
let arrow
let heal


function preload() {
    Game.load.spritesheet ('player','Player_left_right.png',701/14.05,587/16.38)
    Game.load.spritesheet ('player_left','asddsaasd2.png')
    // Game.load.audio('music', "Naruto Theme - The Raising Fighting Spirit (320  kbps).mp3")
    Game.load.audio("jumpsound", "Jump.wav")
    Game.load.audio("footstep", "Footstep1.wav")
    Game.load.image ('platform','download (1).png')
    Game.load.spritesheet ('Archerer', 'Archerer.png',680/4,680/4)
    Game.load.image('ball', 'heal.png')
    Game.load.image('healthbar', 'platform.jpg')
    Game.load.spritesheet ('arrow','Move.png',48/2,5)
}

function create() {
    musicandsound ()
    //plat=Game.add.sprite (window.innerWidth,window.innerHeight,'platform')
    //plat.anchor.setTo(1,1)
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
    console.log (pl.animations)
    
    enemy.frame = 13
}

function update() {
    playermovment()

    shot_counter += 1

    if (pl.visible && enemy.visible){
        damage()
        death()
    }

    if (pl.visible && heal.visible){
        Game.physics.arcade.moveToObject(heal, player, 500)
        healing()
    }

    healthbar.width = pl.health

    healthbar.x = pl.x
    healthbar.y = pl.y

    healthbar_enemy.width = enemy.health

    healthbar_enemy.x = enemy.x+6
    healthbar_enemy.y = enemy.y-5

    if (shot_counter === 70){
        enemy.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow_create()
        shot_counter = 0
    }
    
    if (arrow){
        arrow.animations.add('spin',[0,1],10,true).play()
        arrow.x -= 20
        Game.physics.arcade.enable(arrow)
        if (pl.visible && arrow.visible){
            if (Phaser.Rectangle.intersects(pl.body, arrow.body)){
                pl.health -= 10
                arrow.kill()
                console.log(1)
            }
        }
    }

    if (Game.input.keyboard.addKey(Phaser.Keyboard.F).repeats){
        debug()
    }
}

const musicandsound = function () {
    // music = Game.add.audio('music',0.05);

    // music.play();

    footstep = Game.add.audio('footstep',1)
    jumpsound = Game.add.audio('jumpsound',1)
    
}

const playerf = function () {
    
    pl=Game.add.sprite (100,window.innerHeight,'player')
    pl.anchor.setTo(0.5, 0)
    pl.scale.setTo(3)
    pl.health = 80
    Game.physics.enable (pl)
    pl.body.collideWorldBounds = true
    pl.body.gravity.y = 400
    pl.body.setSize (25,31, 15)
    console.log(pl.body.width)
    console.log(pl.body.height)
}
const plAnim = function() {
    pl.animations.add('Idle',[7,8,9,10],4.8,true)
    pl.animations.add('Idle_left', [6,5,4,3],4.8,true)
    pl.animations.add('Running',[22,23,24,25,26,27],6.5)
    pl.animations.add('Running_left',[19,18,17,16,15,14],6.5)
    pl.animations.add('Jump',[35,36,37,38,39,40,41,49,50],10,false)
    pl.animations.add('Jump_left',[34,33,32,31,30,29,28,48,47],10)
    pl.animations.add('Top',[51],10)
    pl.animations.add('Top_left',[46],10)
}
const playermovment = function (){
    pl.body.velocity.x=0

    if (Game.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
        pl.body.velocity.x=-speed
        if (pl.body.onFloor()===true){
        pl.animations.play('Running_left')
        footstep.play()
        }
        direction = 'left'
    }else if (Game.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
        pl.body.velocity.x = +speed
        if (pl.body.onFloor()===true){
        pl.animations.play('Running')
        footstep.play()
    }
        direction = 'right'
    }else if(direction === 'right'&&pl.body.onFloor()===true){
        (pl.animations.play('Idle'))
    }else if (direction === 'left'&&pl.body.onFloor()===true){
        pl.animations.play('Idle_left')
    }
    if (Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && pl.body.onFloor() && Game.time.now > jumpTimer)
    {
        pl.body.velocity.y = -450
        jumpTimer = Game.time.now + 750
        jumpsound.play()
        
        if(direction === 'right'){
            pl.animations.play('Jump',10,false)
        }else if (direction === 'left'){
           pl.animations.play('Jump_left')} 
    }
    if (pl.body.onFloor() === false&&pl.body.velocity.y<-450){
         if(direction === 'right'){
            pl.animations.play('Top',10,false)
        }else if (direction === 'left'){
           pl.animations.play('Top_left')
        }
    }
    
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
    if (Phaser.Rectangle.intersects(pl.body, enemy.body)){
        pl.health -= 1
    }
}
    
const healing = function() {
    if (pl.overlap(heal)){
        pl.health += 10
        heal.kill()
    }    
}
        
