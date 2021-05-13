'use strict'
const Game = new Phaser.Game(1280,720, Phaser.AUTO, 'game-canvas', { 
    create:create, 
    update:update })
    
    Game.state.add ('boot',bootState)
    Game.state.add ('load',loadState)
    Game.state.add ('MainMenu',MainMenuState)
    Game.state.add ('Controls',controlsState)
    Game.state.add ('Options', optionsState)
    Game.state.add ('play',playSatate)
    Game.state.add ('win',winState)
    Game.state.add ('die',dieState)

    Game.state.start('boot')

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
let music,footstep,jumpsound,counter = 0,plat1,plat2,plat3,plat4,plat5, platform1, platform2, platform3, platform4, platform5, plat_hound, plat_hound2, plat_hound3, burzina = 5, silvers, silver, scoreText, score = 0, redflag
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
let button1






function create() {

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

    CreateFunctions ()

    // title = Game.add.sprite(0,0,'title')
    // title.scale.setTo(0.2)
    // title.anchor.setTo(0.5)
    // title.x = Game.camera.x + Game.camera.width/2
    // title.y = Game.camera.y+ Game.camera.height/2

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
    platform5 = Game.add.group()
    plat_placement()

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

    silvers = Game.add.group()
    silvers.enableBody = true
    silver_create(425, 2700)
    silver_create(3025, 1900)
    silver_create(6425, 2500)
    scoreText = Game.add.text(Game.camera.x, Game.camera.y, "", {fontSize: "32px", fill:"#b19cd9"})
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
    
   if (pl.overlap(platform5)){
       pl.x += burzina
   }

   Game.physics.arcade.overlap(pl, silvers, collectSilver, null, this)

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


function collectSilver (pl, silver) {
    silver.kill()
    scoreText.revive()
    score += 1
    scoreText.text = "Collected Silver:  " + score
}

const CreateFunctions = function () {
    musicandsound ()
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
    Game.physics.arcade.collide(silvers, platform2)
}
const plat_placement = function(){
    platform5_create(750, 3200)

    plat_hound = Game.add.sprite(510, 2400, "plat1")
    plat_hound.scale.setTo(8)
    Game.physics.arcade.enable(plat_hound)
    plat_hound.body.allowGravity = false
    plat_hound.body.collideWorldBounds = true
    plat_hound.body.immovable = true
    
    plat_hound2 = Game.add.sprite(5250, 2508, "plat1")
    plat_hound2.scale.setTo(8)
    Game.physics.arcade.enable(plat_hound2)
    plat_hound2.body.allowGravity = false
    plat_hound2.body.collideWorldBounds = true
    plat_hound2.body.immovable = true

    plat_hound3 = Game.add.sprite(6900, 2900, "plat1")
    plat_hound3.scale.setTo(0)
    Game.physics.arcade.enable(plat_hound3)
    plat_hound3.body.allowGravity = false
    plat_hound3.body.collideWorldBounds = true
    plat_hound3.body.immovable = true
}

const restart = function() {
    healthbar.revive()
    pl.revive()
    pl.health = 110
    pl.x = 100
    pl.y = 5100
    silvers.forEach(element => {
        if (element.visible === false){
            element.revive()
        }
    })
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

const silver_create = function(x, y) {
    silver = silvers.create(x, y, "silver")
    silver.body.gravity.y = 1000
    silver.scale.setTo(0.15)
}