'use strict'
const Game = new Phaser.Game(1280,720, Phaser.AUTO, 'game-canvas', { 
    create:create, 
    update:update })
    
    Game.state.add ('boot',bootState)
    Game.state.add ('load',loadState)
    Game.state.add ('MainMenu',MainMenuState)
    Game.state.add ('Controls',controlsState)
    //Game.state.add ('winState', winState)
    Game.state.add ('Options', optionsState)
    Game.state.add ('play',playSatate)
    Game.state.add ('level2',level2State)
    Game.state.add ('level3',level3State)
    Game.state.add ('dieState', dieState)
    // Game.state.add ('win',winState)
    
    
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
let enemies
let enemies_right
let text_restart
let healthbar
let healthbar_enemy_2
let healthbar_enemy_21
let healthbar_enemy_22
let enemy
let enemy_right
let enemy_2
let enemy_21
let enemy_22
let shot_counter = 0
let arrows
let arrows_right
let arrow
let arrow_right
let archers
let hounds
let fall = false
let backg
let button1
let level = 1







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
    enemy_right_movement()

    if (shot_counter === 70){
        enemy_shot()
        enemy_right_shot()
        shot_counter = 0
    }

    arrow_collision()
    arrow_right_collision()

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
    enemy_phys()
    enemy_right_phys()
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
        music.pause()
        Game.state.start ('dieState')
    }
    enemy_dying()
    enemy_right_dying()
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
        enemy_right_damage()
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
        enemy_right_hit()
        enemy_2_hit()
        enemy_21_hit()
        enemy_22_hit()
    }
}

const collide = function() {
    
    enemy_collision()
    enemy_right_collision()
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