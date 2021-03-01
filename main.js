'use strict'
const Game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, 'game-canvas', { 
    preload:preload, 
    create:create, 
    update:update })

let pl
let attack = 0
let attacker
let attacker1
let music,footstep,jumpsound,counter = 0,plat1,plat2,plat3,plat4,plat5, platform1, platform2, platform3, platform4, platform5, burzina = 5
let speed = 250
let plat
let jumpTimer = 0
let direction = 'right'
let text
let healthbar
let healthbar_enemy
let healthbar_enemy_2
let enemy
let enemy_2
let shot_counter = 0
let arrows
let arrow
let heal
let archers
let hounds
let fall = false



function preload() {
    Game.load.spritesheet ('player','Player_left_right.png',701/14.05,587/16.38)
    Game.load.spritesheet ('player_left','asddsaasd2.png')
    Game.load.image('attack_left', 'attack_left.png')
    Game.load.image('attack_right', 'attack_right.png')
    Game.load.audio('music', "Naruto Theme - The Raising Fighting Spirit (320  kbps).mp3")
    Game.load.audio("jumpsound", "Jump.wav")
    Game.load.audio("footstep", "Footstep1.wav")
    Game.load.image("plat1", "platform 1.png")
    Game.load.image("plat2", "platform 2.png")
    Game.load.image("plat3", "platform_3.png")
    Game.load.image("plat4", "platform 4.png")
    Game.load.image("plat5", "platform 5.png")
    Game.load.image("game_over", "over.png")
    Game.load.image ('platform','download (1).png')
    Game.load.spritesheet ('Archerer', 'Archerer.png',680/4,680/4)
    Game.load.spritesheet ('Hound', 'hell-hound-run.png',335/5,32)
    Game.load.image('ball', 'heal.png')
    Game.load.image('healthbar', 'platform.jpg')
    Game.load.spritesheet ('arrow','Move.png',48/2,5)
}

function create() {
    musicandsound ()
    playerf ()
    plAnim ()
    enemy_create()
    enemy_phys()
    enemy_2_create()
    enemy_2_phys()

    text = Game.add.sprite(0, 0, 'game_over')
    text.kill()

    attacker = Game.add.sprite(pl.x-70, pl.y+20, 'attack_left')
    Game.physics.enable(attacker)
    attacker.scale.setTo(0)

    attacker1 = Game.add.sprite(pl.x-70, pl.y+20, 'attack_right')
    Game.physics.enable(attacker1)
    attacker1.scale.setTo(0)
    
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

    arrows = Game.add.group()
    platform1 = Game.add.group()
    platform2 = Game.add.group()
    platform3 = Game.add.group()
    platform4 = Game.add.group()
    platform5 = Game.add.group()
    plat_placement()
    enemy.frame = 13

    Game.world.setBounds(0,0,10000,7000)

}

function update() {
    playermovment()
    collide()
    deadly_void()
    attack_player()

    attacker.x = pl.x-70
    attacker.y = pl.y+15
    
    attacker1.x = pl.x-70
    attacker1.y = pl.y+15

    //console.log(pl.y)

    if (fall === false){
        Game.camera.follow(pl)
    }else if (fall === true){
        Game.camera.unfollow(pl)
        text.x = Game.camera.x + Game.camera.width/2
        text.y = Game.camera.y+ Game.camera.height/2
        text.anchor.setTo(0.5)
        text.revive()
    }

    //console.log(pl.x)

    enemy_2_movement()

    shot_counter += 1

    damage()
    if (pl.visible && enemy.visible && enemy_2.visible){
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
    if (enemy.visible === true){
        shooting()
    }

    if (Game.input.keyboard.addKey(Phaser.Keyboard.F).repeats){
        debug()
    }
    platform5.x += burzina

    if(platform5.x > 1500){
       burzina *= -1}

    if (platform5.x < 0){
   burzina = 5}
    
   if (pl.overlap(platform5)){
       pl.x += burzina
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
    if (attack === 0){
        pl.scale.setTo(3)
        attacker.scale.setTo(0)
        attacker1.scale.setTo(0)
        if (pl.visible && enemy.visible && enemy_2.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy.body)||Phaser.Rectangle.intersects(pl.body, enemy_2.body)){
            pl.health -= 1
        }}
    }
    else if (attack === 1){
        pl.animations.add('Invisible',[222],4).play()
        if (direction === 'left'){
            attacker.scale.setTo(3.5)
        }else if (direction === 'right'){
            attacker1.scale.setTo(3.5)
        }
        if (Phaser.Rectangle.intersects(attacker.body, enemy.body)){
            enemy.health -= 10
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy.body)){
            enemy.health -= 10
        }
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
    Game.physics.arcade.collide(pl, platform2)
    Game.physics.arcade.collide(pl, platform3)
    Game.physics.arcade.collide(pl, platform4)
    Game.physics.arcade.collide(pl, platform5)
    Game.physics.arcade.collide(enemy, platform1)
    Game.physics.arcade.collide(enemy, platform2)
    Game.physics.arcade.collide(enemy, platform3)
    Game.physics.arcade.collide(enemy, platform4)
    Game.physics.arcade.collide(enemy, platform5)
    Game.physics.arcade.collide(enemy_2, platform1)
    Game.physics.arcade.collide(enemy_2, platform2)
    Game.physics.arcade.collide(enemy_2, platform3)
    Game.physics.arcade.collide(enemy_2, platform4)
    Game.physics.arcade.collide(enemy_2, platform5)
}
const plat_placement = function(){
    // 1
    platform4_create(0, 5300)
    platform4_create(750, 5100)
    platform4_create(300, 4800)
    platform4_create(0, 4500)
    platform3_create(550, 4200)
    platform3_create(550, 4000)
    platform5_create(1000, 3700)
    // 2
    platform3_create(2300, 3400)
    platform3_create(1800, 3150)
    platform1_create(1000, 3000)
    platform2_create(400, 2800)
    // 3
    platform4_create(3400, 3700)
    platform4_create(4200, 3500)
    platform4_create(5000, 3300)
    // 4
    platform3_create(4300, 3100)
    platform3_create(4900, 2800)
    platform3_create(4200, 2600)
    platform1_create(3500, 2300)
    platform2_create(3000, 2000)
    // 5
    platform2_create(5100, 4300)
    platform4_create(6000, 4700)
}