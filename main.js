'use strict'
const Game = new Phaser.Game(window.innerWidth,window.innerHeight, Phaser.AUTO, 'game-canvas', { 
    preload:preload, 
    create:create, 
    update:update })

let pl
let title
let win0
let win1
let win2
let win3
let attack = 0
let jumping = 0
let attacker
let attacker1
let dash1
let dash2
let dasher = 0
let music,footstep,jumpsound,counter = 0,plat1,plat2,plat3,plat4,plat5, platform1, platform2, platform3, platform4, platform5, plat_hound, plat_hound2, plat_hound3, burzina = 5, diamonds, diamond, scoreText, score = 0, redflag
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
let healthbar_enemy2
let healthbar_enemy3
let healthbar_enemy4
let healthbar_enemy5
let healthbar_enemy6
let healthbar_enemy7
let healthbar_enemy8
let healthbar_enemy9
let healthbar_enemy_2
let healthbar_enemy_21
let healthbar_enemy_22
let enemy
let enemy2
let enemy3
let enemy4
let enemy5
let enemy6
let enemy7
let enemy8
let enemy9
let enemy_2
let enemy_21
let enemy_22
let shot_counter = 0
let arrows
let arrow2s
let arrow3s
let arrow4s
let arrow5s
let arrow6s
let arrow7s
let arrow8s
let arrow9s
let arrow
let arrow2
let arrow3
let arrow4
let arrow5
let arrow6
let arrow7
let arrow8
let arrow9
let archers
let hounds
let fall = false
let backg



function preload() {
    Game.load.image("strelka", "strelka.png")
    Game.load.image("game_over", "over.png")
    Game.load.image("restart", "restart.png")
    Game.load.image('title', 'title.png')
    Game.load.image('zero_diamonds', 'zero_diamonds.png')
    Game.load.image('1_diamond', '1_diamond.png')
    Game.load.image('2_diamonds', '2_diamonds.png')
    Game.load.image('3_diamonds', '3_diamonds.png')
    Game.load.spritesheet ('player','Player_left_right.png',701/14.05,587/16.38)
    Game.load.image('attack_left', 'attack_left.png')
    Game.load.image('attack_right', 'attack_right.png')
    Game.load.image('dash_right', 'dash_right.png')
    Game.load.image('dash_left', 'dash_left.png')
    Game.load.audio('music', "Cave Story OST Mimiga Town Extended Version.mp3")
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
    Game.load.image('bg','background.png')
}


function create() {
    backg=Game.add.tileSprite(0,0,5000,10000,'bg')
    //backg.scale.setTo (window.Width,window.Height)
    backg.fixedToCamera = true

    let strelka = Game.add.sprite(5500, 3000, "strelka")
    strelka.scale.setTo(0.1)

    win0 = Game.add.sprite(0,0,'zero_diamonds')
    win0.scale.setTo(0.2)
    win0.anchor.setTo(0.5)
    win0.kill()

    win1 = Game.add.sprite(0,0,'1_diamond')
    win1.scale.setTo(0.2)
    win1.anchor.setTo(0.5)
    win1.kill()

    win2 = Game.add.sprite(0,0,'2_diamonds')
    win2.scale.setTo(0.2)
    win2.anchor.setTo(0.5)
    win2.kill()

    win3 = Game.add.sprite(0,0,'3_diamonds')
    win3.scale.setTo(0.2)
    win3.anchor.setTo(0.5)
    win3.kill()

    musicandsound ()
    playerf ()
    plAnim ()
    enemy_create()
    enemy2_create()
    enemy3_create()
    enemy4_create()
    enemy5_create()
    enemy6_create()
    enemy7_create()
    enemy8_create()
    enemy9_create()
    enemy_phys()
    enemy2_phys()
    enemy3_phys()
    enemy4_phys()
    enemy5_phys()
    enemy6_phys()
    enemy7_phys()
    enemy8_phys()
    enemy9_phys()
    enemy_2_create()
    enemy_21_create()
    enemy_22_create()
    enemy_2_phys()
    enemy_21_phys()
    enemy_22_phys()

    title = Game.add.sprite(0,0,'title')
    title.scale.setTo(0.2)
    title.anchor.setTo(0.5)
    title.x = Game.camera.x + Game.camera.width/2
    title.y = Game.camera.y+ Game.camera.height/2

    attacker = Game.add.sprite(pl.x-70, pl.y+20, 'attack_left')
    Game.physics.enable(attacker)
    attacker.scale.setTo(0)

    dash1 = Game.add.sprite(pl.x, pl.y, 'dash_right')
    dash1.scale.setTo(0)

    attacker1 = Game.add.sprite(pl.x-70, pl.y+20, 'attack_right')
    Game.physics.enable(attacker1)
    attacker1.scale.setTo(0)

    dash2 = Game.add.sprite(pl.x, pl.y, 'dash_left')
    dash2.scale.setTo(0)

    healthbar = Game.add.sprite(0,0,'healthbar')
    healthbar.width = pl.health
    healthbar.scale.setTo(0.05)
    healthbar.anchor.setTo(0.5, 1)

    arrows = Game.add.group()
    arrow2s = Game.add.group()
    arrow3s = Game.add.group()
    arrow4s = Game.add.group()
    arrow5s = Game.add.group()
    arrow6s = Game.add.group()
    arrow7s = Game.add.group()
    arrow8s = Game.add.group()
    arrow9s = Game.add.group()
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
    scoreText.fixedToCamera = true
}

function update() {
    if(title.visible === true){
        start()
    }

    playermovment()
    collide()
    deadly_void()
    attack_player()

    attacker.x = pl.x-70
    attacker.y = pl.y+15

    dash1.x = pl.x-10
    dash1.y = pl.y
    
    attacker1.x = pl.x-70
    attacker1.y = pl.y+15

    dash2.x = pl.x
    dash2.y = pl.y

    //console.log(pl.y)

    //console.log(enemy_2.width)
    //console.log(plat3.width)

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
    enemy_21_movement()
    enemy_22_movement()

    shot_counter += 1

    damage()
    death()

    healthbar.width = pl.health

    healthbar.x = pl.x
    healthbar.y = pl.y

    enemy_movment()
    enemy2_movment()
    enemy3_movment()
    enemy4_movment()
    enemy5_movment()
    enemy6_movment()
    enemy7_movment()
    enemy8_movment()
    enemy9_movment()

    if (shot_counter === 70){
        enemy_shot()
        enemy2_shot()
        enemy3_shot()
        enemy4_shot()
        enemy5_shot()
        enemy6_shot()
        enemy7_shot()
        enemy8_shot()
        enemy9_shot()
        shot_counter = 0
    }

    arrow_collision()
    arrow2_collision()
    arrow3_collision()
    arrow4_collision()
    arrow5_collision()
    arrow6_collision()
    arrow7_collision()
    arrow8_collision()
    arrow9_collision()

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
        pl.kill()
        win0.revive()
        win0.x = Game.camera.x + Game.camera.width/2
        win0.y = Game.camera.y+ Game.camera.height/2
        if (Game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown){
            restart()
        }
   }
   if (pl.overlap(redflag) && score === 1){
        pl.kill()
        win1.revive()
        win1.x = Game.camera.x + Game.camera.width/2
        win1.y = Game.camera.y+ Game.camera.height/2
        if (Game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown){
            restart()
        }
   }
   if (pl.overlap(redflag) && score === 2){
        pl.kill()
        win2.revive()
        win2.x = Game.camera.x + Game.camera.width/2
        win2.y = Game.camera.y+ Game.camera.height/2
        if (Game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown){
            restart()
        }
   }
   if (pl.overlap(redflag) && score === 3){
        pl.kill()
        win3.revive()
        win3.x = Game.camera.x + Game.camera.width/2
        win3.y = Game.camera.y+ Game.camera.height/2
        if (Game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown){
            restart()
        }
   }
}


function collectDiamond (pl, diamond) {
    diamond.kill()
    scoreText.revive()
    score += 1
    scoreText.text = "diamond" + score
}

const musicandsound = function () {
    music = Game.add.audio('music', 0.05, true);
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
    enemy3_dying()
    enemy4_dying()
    enemy5_dying()
    enemy6_dying()
    enemy7_dying()
    enemy8_dying()
    enemy9_dying()
    enemy_2_dying()
    enemy_21_dying()
    enemy_22_dying()
}

const damage = function() {
    if (attack === 0){
        pl.scale.setTo(3)
        attacker.scale.setTo(0)
        attacker1.scale.setTo(0)
        enemy_damage()
        enemy2_damage()
        enemy3_damage()
        enemy4_damage()
        enemy5_damage()
        enemy6_damage()
        enemy7_damage()
        enemy8_damage()
        enemy9_damage()
        enemy_2_damage()
        enemy_21_damage()
        enemy_22_damage()
    }
    else if (attack === 1){
        pl.animations.add('Invisible',[222],4).play()
        if (direction === 'left'){
            attacker.scale.setTo(3.5)
            attacker1.scale.setTo(0)
            dash1.scale.setTo(0)
            dash2.scale.setTo(0)
        }else if (direction === 'right'){
            attacker1.scale.setTo(3.5)
            attacker.scale.setTo(0)
            dash1.scale.setTo(0)
            dash2.scale.setTo(0)
        }
        enemy_hit()
        enemy2_hit()
        enemy3_hit()
        enemy4_hit()
        enemy5_hit()
        enemy6_hit()
        enemy7_hit()
        enemy8_hit()
        enemy9_hit()
        enemy_2_hit()
        enemy_21_hit()
        enemy_22_hit()
    }
}

const collide = function() {
    Game.physics.arcade.collide(pl, platform1)
    Game.physics.arcade.collide(pl, platform2)
    Game.physics.arcade.collide(pl, platform3)
    Game.physics.arcade.collide(pl, platform4)
    Game.physics.arcade.collide(pl, platform5)
    Game.physics.arcade.collide(pl, plat_hound)
    Game.physics.arcade.collide(pl, plat_hound2)
    Game.physics.arcade.collide(pl, plat_hound3)
    enemy_collision()
    enemy2_collision()
    enemy3_collision()
    enemy4_collision()
    enemy5_collision()
    enemy6_collision()
    enemy7_collision()
    enemy8_collision()
    enemy9_collision()
    enemy_2_collision()
    enemy_21_collision()
    enemy_22_collision()
    Game.physics.arcade.collide(diamonds, platform2)
}
const plat_placement = function(){
    // 1
    platform4_create(0, 5300)
    platform4_create(550, 5100)
    platform4_create(300, 4800)
    platform4_create(0, 4500)
    platform3_create(550, 4200)
    platform3_create(650, 4000)
    platform5_create(1000, 3700)
    // 2
    platform3_create(2300, 3400)
    platform3_create(1800, 3150)

    plat_hound = Game.add.sprite(1000, 3000, "plat1")
    plat_hound.scale.setTo(8)
    Game.physics.arcade.enable(plat_hound)
    plat_hound.body.allowGravity = false
    plat_hound.body.collideWorldBounds = true
    plat_hound.body.immovable = true
    
    plat_hound2 = Game.add.sprite(3500, 2300, "plat1")
    plat_hound2.scale.setTo(8)
    Game.physics.arcade.enable(plat_hound2)
    plat_hound2.body.allowGravity = false
    plat_hound2.body.collideWorldBounds = true
    plat_hound2.body.immovable = true

    plat_hound3 = Game.add.sprite(6900, 2900, "plat1")
    plat_hound3.scale.setTo(8)
    Game.physics.arcade.enable(plat_hound3)
    plat_hound3.body.allowGravity = false
    plat_hound3.body.collideWorldBounds = true
    plat_hound3.body.immovable = true

    platform2_create(400, 2800)
    // 3
    platform4_create(3400, 3700)
    platform4_create(4200, 3500)
    platform4_create(5000, 3300)
    // 4
    platform3_create(4300, 3100)
    platform3_create(4900, 2800)
    platform3_create(4200, 2600)
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
    platform2_create(6400, 2600)
    // 7
    platform2_create(9500, 3700)
    platform4_create(9550, 3500)
    platform1_create(10000, 3200)


}

const restart = function() {
    healthbar.revive()
    pl.revive()
    pl.health = 110
    pl.x = 100
    pl.y = 5100
    text.kill()
    text_restart.kill()
    win0.kill()
    win1.kill()
    win2.kill()
    win3.kill()
    diamonds.forEach(element => {
        if (element.visible === false){
            element.revive()
        }
    })
    scoreText.kill()
    score = 0
    enemy_revive()
    enemy2_revive()
    enemy3_revive()
    enemy4_revive()
    enemy5_revive()
    enemy6_revive()
    enemy7_revive()
    enemy8_revive()
    enemy9_revive()
    enemy_2_revive()
    enemy_21_revive()
    enemy_22_revive()
}

const start = function() {
    if (Game.input.keyboard.addKey(Phaser.Keyboard.ENTER).isDown){
        pl.revive()
        title.kill()
    }
}

const diamond_create = function(x, y) {
    diamond = diamonds.create(x, y, "diamond")
    diamond.body.gravity.y = 1000
    diamond.scale.setTo(0.09)
}