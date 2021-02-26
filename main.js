'use strict'
const Game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, 'game-canvas', { 
    preload:preload, 
    create:create, 
    update:update })

let pl
let music,footstep,jumpsound,counter = 0, platforms, platform1, platform2, platform3, platform4, platform5
let speed = 250
let plat
let jumpTimer = 0
let direction = 'right'
let healthbar
let healthbar_enemy
let healthbar_enemy_2
let enemy
let enemy_2
let shot_counter = 0
let arrows
let arrow
let heal


function preload() {
    Game.load.spritesheet ('player','Player_left_right.png',701/14.05,587/16.38)
    Game.load.spritesheet ('player_left','asddsaasd2.png')
    Game.load.audio('music', "Naruto Theme - The Raising Fighting Spirit (320  kbps).mp3")
    Game.load.audio("jumpsound", "Jump.wav")
    Game.load.audio("footstep", "Footstep1.wav")
    Game.load.image("plat1", "platform 1.png")
    Game.load.image("plat2", "platform 2.png")
    Game.load.image("plat3", "platform_3.png")
    Game.load.image("plat4", "platform 4.png")
    Game.load.image("plat5", "platform 5.png")
    Game.load.image ('platform','download (1).png')
    Game.load.spritesheet ('Archerer', 'Archerer.png',680/4,680/4)
    Game.load.spritesheet ('Hound', 'hell-hound-run.png',335/5,32)
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
    enemy_2_create()
    enemy_2_phys()
    // platformi()

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

    healthbar_enemy_2 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy_2.width = enemy.health
    healthbar_enemy_2.scale.setTo(0.05)
    healthbar_enemy_2.anchor.setTo(0.5, 1)

    Game.stage.backgroundColor = "#4488AA"
    console.log (pl.animations)

    arrows = Game.add.group()
    platforms = Game.add.group()
    enemy.frame = 13

    platforms_create(100,500)
}

function update() {
    playermovment()
    collide()

    enemy_2_movement()

    shot_counter += 1

    if (pl.visible && enemy.visible){
        damage()
        death()
    }

    if (pl.visible && heal.visible){
        Game.physics.arcade.moveToObject(heal, pl, 500)
        healing()
    }

    healthbar.width = pl.health

    healthbar.x = pl.x
    healthbar.y = pl.y

    healthbar_enemy.width = enemy.health

    healthbar_enemy.x = enemy.x+6
    healthbar_enemy.y = enemy.y-5

    healthbar_enemy_2.width = enemy_2.health

    healthbar_enemy_2.x = enemy_2.x+enemy_2.width/2+6
    healthbar_enemy_2.y = enemy_2.y-5

    shooting()

    if (Game.input.keyboard.addKey(Phaser.Keyboard.F).repeats){
        debug()
    }
}

const musicandsound = function () {
    music = Game.add.audio('music',0.05);
    music.play();

    footstep = Game.add.audio('footstep',1)
    jumpsound = Game.add.audio('jumpsound',1)
    
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

const collide = function() {
    Game.physics.arcade.collide(pl, platform1)
    Game.physics.arcade.collide(enemy_2, platform1)
}
        
// const platformi = function() {
//     platforma1 = Game.add.sprite(800,1000,"plat4")
//     platforma1.scale.setTo(5)
// }
