'use strict'
const Game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, 'game-canvas', { 
    preload:preload, 
    create:create, 
    update:update })

let pl
let attack = 0
let attacker
let attacker1
let music,footstep,jumpsound,counter = 0,plat1,plat2,plat3,plat4,plat5, platform1, platform2, platform3, platform4, platform5, burzina = 5, diamonds, diamond, scoreText, score = 0, redflag
let speed = 250
let plat
let jumpTimer = 0
let dashTimer = 0
let dash = 0
let dashing = 0
let direction = 'right'
let text
let text_restart
let healthbar
let healthbar_enemy
let healthbar_enemy_2
let enemy
let enemy2
let enemy_2
let shot_counter = 0
let arrows
let arrow2s
let arrow
let arrow2
let archers
let hounds
let fall = false



function preload() {
    Game.load.image("game_over", "over.png")
    Game.load.image("restart", "restart.png")
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
    Game.load.image ('platform','download (1).png')
    Game.load.spritesheet ('Archerer', 'Archerer.png',680/4,680/4)
    Game.load.spritesheet ('Hound', 'hell-hound-run.png',335/5,32)
    Game.load.image('healthbar', 'platform.jpg')
    Game.load.spritesheet ('arrow','Move.png',48/2,5)
    Game.load.image('redflag', 'redflag.png')
    Game.load.image("diamond", "diamond.png")
    Game.load.image("strelka", "strelka.png")
}

function create() {
    musicandsound ()
    playerf ()
    plAnim ()
    enemy_create()
    enemy2_create()
    enemy_phys()
    enemy2_phys()
    enemy_2_create()
    enemy_2_phys()

    attacker = Game.add.sprite(pl.x-70, pl.y+20, 'attack_left')
    Game.physics.enable(attacker)
    attacker.scale.setTo(0)

    attacker1 = Game.add.sprite(pl.x-70, pl.y+20, 'attack_right')
    Game.physics.enable(attacker1)
    attacker1.scale.setTo(0)

    healthbar = Game.add.sprite(0,0,'healthbar')
    healthbar.width = pl.health
    healthbar.scale.setTo(0.05)
    healthbar.anchor.setTo(0.5, 1)

    healthbar_enemy_2 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy_2.width = enemy_2.health
    healthbar_enemy_2.scale.setTo(0.05)
    healthbar_enemy_2.anchor.setTo(0.5, 1)

    Game.stage.backgroundColor = "#4488AA"

    arrows = Game.add.group()
    arrow2s = Game.add.group()
    platform1 = Game.add.group()
    platform2 = Game.add.group()
    platform3 = Game.add.group()
    platform4 = Game.add.group()
    platform5 = Game.add.group()
    plat_placement()

    Game.world.setBounds(0,0,10000,7000)

    text = Game.add.sprite(0, 0, 'game_over')
    text.kill()

    text_restart = Game.add.sprite(0, 0, 'restart')
    text_restart.kill()

    redflag = Game.add.sprite(9800, 3100, "redflag")
    redflag.scale.setTo(0.2)
    Game.physics.arcade.enable(redflag)
    redflag.body.allowGravity = false
    redflag.body.collideWorldBounds = true
    redflag.body.immovable = true

    diamonds = Game.add.group()
    diamonds.enableBody = true
    diamond_create(425, 2700)
    diamond_create(3025, 1900)
    diamond_create(6425, 2500)
    scoreText = Game.add.text(Game.camera.x, Game.camera.y, "", {fontSize: "32px", fill:"#000"})

    let strelka = Game.add.sprite(5500, 3000, "strelka")
    strelka.scale.setTo(0.1)
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
        text_restart.x = Game.camera.x + Game.camera.width/2
        text_restart.y = Game.camera.y+ Game.camera.height/2 + 300
        text_restart.scale.setTo(0.2)
        text_restart.anchor.setTo(0.5)
        text_restart.revive()
        if (Game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown){
            restart()
            fall = false
        }
    }

    //console.log(pl.x)

    enemy_2_movement()

    shot_counter += 1

    damage()
    death()

    healthbar.width = pl.health

    healthbar.x = pl.x
    healthbar.y = pl.y

    enemy_movment()
    enemy2_movment()

    if (shot_counter === 70){
        enemy_shot()
        enemy2_shot()
        shot_counter = 0
    }

    arrow_collision()
    arrow2_collision()

    healthbar_enemy_2.width = enemy_2.health

    healthbar_enemy_2.x = enemy_2.x+enemy_2.width/2+6
    healthbar_enemy_2.y = enemy_2.y-5

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

   Game.physics.arcade.overlap(pl, diamonds, collectDiamond, null, this)

   if (pl.overlap(redflag) && score === 0){
        alert ("You Win! You didn't collect any diamonds :(")
        restart()
   }
   if (pl.overlap(redflag) && score === 1){
    alert ("You Win! You collected 1 diamond :)")
    restart()
   }
   if (pl.overlap(redflag) && score === 2){
    alert ("You Win! You collected 2 diamonds :)")
    restart()
   }
   if (pl.overlap(redflag) && score === 3){
    alert ("You Win! You collected 3 diamonds :)")
    restart()
   }
scoreText.x = Game.camera.x
scoreText.y = Game.camera.y
  
}


function collectDiamond (pl, diamond) {
    diamond.kill()
    score += 1
    scoreText.text = "Collected Diamonds:" + score
}

const musicandsound = function () {
    music = Game.add.audio('music',0.05);
    music.play();

    footstep = Game.add.audio('footstep',1)
    jumpsound = Game.add.audio('jumpsound',1)
    
}
const death = function() {
    if (pl.health < 0){
        healthbar.kill()
        pl.kill()
        text.x = Game.camera.x + Game.camera.width/2
        text.y = Game.camera.y+ Game.camera.height/2
        text.anchor.setTo(0.5)
        text.revive()
        text_restart.x = Game.camera.x + Game.camera.width/2
        text_restart.y = Game.camera.y+ Game.camera.height/2 + 300
        text_restart.scale.setTo(0.2)
        text_restart.anchor.setTo(0.5)
        text_restart.revive()
        if (Game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown){
            restart()
        }
    }
    enemy_dying()
    enemy2_dying()
    if (enemy_2.health < 0){
        healthbar_enemy_2.kill()
        enemy_2.kill()
    }
}

const damage = function() {
    if (attack === 0){
        pl.scale.setTo(3)
        attacker.scale.setTo(0)
        attacker1.scale.setTo(0)
        if (pl.visible && enemy_2.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy_2.body)){
            pl.health -= 1
        }}
        enemy_damage()
        enemy2_damage()
    }
    else if (attack === 1){
        pl.animations.add('Invisible',[222],4).play()
        if (direction === 'left'){
            attacker.scale.setTo(3.5)
        }else if (direction === 'right'){
            attacker1.scale.setTo(3.5)
        }
        enemy_hit()
        enemy2_hit()
        if (pl.visible && enemy_2.visible){
            if (Phaser.Rectangle.intersects(attacker.body, enemy_2.body)){
                enemy_2.health -= 5
                pl.health += 5
            }
            if (Phaser.Rectangle.intersects(attacker1.body, enemy_2.body)){
                enemy_2.health -= 5
                pl.health += 5
            }
        }
    }
}

const collide = function() {
    Game.physics.arcade.collide(pl, platform1)
    Game.physics.arcade.collide(pl, platform2)
    Game.physics.arcade.collide(pl, platform3)
    Game.physics.arcade.collide(pl, platform4)
    Game.physics.arcade.collide(pl, platform5)
    enemy_collision()
    enemy2_collision()
    Game.physics.arcade.collide(enemy_2, platform1)
    Game.physics.arcade.collide(enemy_2, platform2)
    Game.physics.arcade.collide(enemy_2, platform3)
    Game.physics.arcade.collide(enemy_2, platform4)
    Game.physics.arcade.collide(enemy_2, platform5)
    Game.physics.arcade.collide(diamonds, platform2)
}
const plat_placement = function(){
    // 1
    platform4_create(0, 5300)
    platform4_create(550, 5100)
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
    platform4_create(5900, 4700)
    platform2_create(6600, 4700)
    platform2_create(7000, 4700)
    platform2_create(7600, 4700)
    platform2_create(7850, 4700)
    platform4_create(8200, 4700)
    platform4_create(8800, 4400)
    platform4_create(8100, 4100)
    platform4_create(8700, 3750)
    // 6
    platform3_create(8100, 3500)
    platform3_create(7600, 3200)
    platform1_create(6900, 2900)
    platform2_create(6400, 2600)
    // 7
    platform2_create(9500, 3700)
    platform4_create(9550, 3500)
    platform1_create(10000, 3200)


}

const restart = function() {
    healthbar.revive()
    pl.revive()
    pl.health = 80
    pl.x = 0
    pl.y = 5100
    text.kill()
    text_restart.kill()
    enemy_revive()
    enemy2_revive()
    healthbar_enemy_2.revive()
    enemy_2.revive()
    enemy_2.health = 50
}

const diamond_create = function(x, y) {
    diamond = diamonds.create(x, y, "diamond")
    diamond.body.gravity.y = 1000
    diamond.scale.setTo(0.09)
}