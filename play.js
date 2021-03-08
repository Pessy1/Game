const playSatate = function(Game) {
   let backg
   let attacker
   let attacker1
   let dash1
   let dash2

}

playSatate.prototype = {
    create:function () {
    this.backGround()
    this.strelka()
    this.playerf()
    this.playerAtacks()

    CreateFunctions()

    music = Game.add.audio('music', 0.05, true);
    music.play();

    footstep = Game.add.audio('footstep',1)
    jumpsound = Game.add.audio('jumpsound',1)

    Game.world.setBounds(0,0,10000,7000)
    Game.camera.follow(pl)

    attacker = Game.add.sprite(pl.x-70, pl.y+20, 'attack_left')
    Game.physics.enable(attacker)
    attacker.scale.setTo(0)

    dash1 = Game.add.sprite(pl.x, pl.y, 'dash_right')
    dash1.scale.setTo(0)


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

    },

    update:function () {

    },
    
    backGround: function () {
    backg=Game.add.tileSprite(0,0,5000,10000,'bg')
    backg.fixedToCamera = true
    backg.scale.setTo(1.5,2)
    },

    strelka: function () {
    let strelka = Game.add.sprite(5500, 3000, "strelka")
    strelka.scale.setTo(0.1)
    },

    playerAtacks: function() {
    attacker = Game.add.sprite(pl.x-70, pl.y+20, 'attack_left')
    Game.physics.enable(attacker)
    attacker.scale.setTo(0)

    attacker1 = Game.add.sprite(pl.x-70, pl.y+20, 'attack_right')
    Game.physics.enable(attacker1)
    attacker1.scale.setTo(0)
    },
    
    playerf: function () {
    pl=Game.add.sprite (4200, 2600-100,'player')
    pl.anchor.setTo(0.5, 0)
    pl.scale.setTo(3)
    pl.health = 110
    Game.physics.enable (pl)
    pl.body.collideWorldBounds = true
    pl.body.gravity.y = 750
    pl.body.setSize (25,31, 15)
    },

    update:function () {
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
    
       Game.physics.arcade.overlap(pl, silvers, collectSilver, null, this)
    
    }
}