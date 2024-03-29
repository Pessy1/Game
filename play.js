const playSatate = {


    create:function () {
    this.backGround()
    map = Game.add.tilemap('platforms')
    map.addTilesetImage("platfrom_tileset", "level_1")
    map.setCollisionByExclusion([])
    ground = map.createLayer(0)
    Game.physics.arcade.enable(ground)
    ground.body.immovable = true
    enemies = Game.add.group()
    enemies_right = Game.add.group()
    enemy_create(500, 3400)
    enemy_create(600, 3000)
    enemy_create(2500, 2700)
    enemy_create(3000, 3600)
    enemy_create(4900, 3600)
    enemy_create(6700, 3600)
    enemy_right_create(6400, 2600)
    this.strelka()
    this.playerf()
    this.playerAtacks()
    this.plAnim()
    CreateFunctions()
    this.button()
    this.PauseESC()
    
    flag = Game.add.image (7480,2515,'redflag')
    flag.anchor.setTo (0.5)
    flag.scale.setTo (0.25)

    footstep = Game.add.audio('footstep',1)
    jumpsound = Game.add.audio('jumpsound',1)

    Game.world.setBounds(0,0,7500,7500)
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
    arrows_right = Game.add.group()
    arrows.checkWorldBounds = true
    arrows.outOfBoundsKill = true
    arrows_right.checkWorldBounds = true
    arrows_right.outOfBoundsKill = true
    platform5 = Game.add.group()
    plat_placement()
    scoreText = Game.add.text(Game.camera.x, Game.camera.y, "", {fontSize: "32px", fill:"#b19cd9"})
    scoreText.fixedToCamera = true
    scoreText.kill()

    
    // Game.pauseb.anchor.setTo(1)

    silvers = Game.add.group()
    silvers.enableBody = true
    silver_create(5100, 2100)
    silver_create(350, 2000)
    
},

    backGround: function () {
    backg=Game.add.tileSprite(0,0,5000,10000,'bg')
    backg.fixedToCamera = true
    backg.scale.setTo(0.5,0.5)
    },

    strelka: function () {
    let strelka = Game.add.sprite(3000, 3000, "strelka")
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
    pl=Game.add.sprite (0,0,'player')
    pl.anchor.setTo(0.5, 0)
    pl.scale.setTo(3)
    pl.health = 110
    Game.physics.enable (pl)
    pl.body.collideWorldBounds = true
    pl.body.gravity.y = 900
    pl.body.setSize (25,31, 15)
    },

    plAnim: function() {
        pl.animations.add('Idle',[7,8,9,10],4.8,true)
        pl.animations.add('Idle_left', [6,5,4,3],4.8,true)
        pl.animations.add('Running',[22,23,24,25,26,27],6.5)
        pl.animations.add('Running_left',[19,18,17,16,15,14],6.5)
        pl.animations.add('Jump',[35,36,37,38,39,40,41,49,50],10,false)
        pl.animations.add('Jump_left',[34,33,32,31,30,29,28,48,47],10)
        pl.animations.add('Top',[51],10)
        pl.animations.add('Top_left',[46],10)
    },

    update:function () {
        ground_check = false
        Game.physics.arcade.collide(pl, ground, animate_player)
        Game.physics.arcade.collide(pl, platform5, animate_player)
        Game.physics.arcade.collide(pl, plat_hound, animate_player)
        Game.physics.arcade.collide(pl, plat_hound2, animate_player)
        Game.physics.arcade.collide(pl, plat_hound3, animate_player)
        Game.physics.arcade.collide(silvers, ground)
        console.log(pl.y)
        console.log(pl.x)
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
            music.pause()
            Game.state.start ('dieState')

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
    
        if(platform5.x > 350){
           burzina *= -1}
    
        if (platform5.x < 0){
       burzina = 5}
        
       if (pl.overlap(platform5)){
           pl.x += burzina
       }
    
       Game.physics.arcade.overlap(pl, silvers, collectSilver, null, this)

        // if (Game.paused == false && Game.input.keyboard.addKey(Phaser.Keyboard.ESC).isDown) {
        //     Game.paused = true
    
        if (pl.overlap (flag)) {
            music.pause()
            Game.state.start ('level2')
        }
    },

    button: function () {
    pauseb = Game.add.button (Game.camera.x+Game.camera.width, Game.camera.y,'pause',this.actionOnClick,Game)
    pauseb.anchor.setTo(1,0)
    pauseb.scale.setTo (1.5)
    pauseb.fixedToCamera = true
    pauseb.inputEnable = true

    optb = Game.add.button (Game.camera.x+Game.camera.width/2, Game.camera.y+Game.camera.height/2,'optb',this.actionOnClick2,Game)
    optb.anchor.setTo (0.5)
    optb.fixedToCamera = true
    optb.kill ()
    },

    actionOnClick: function () {
        if (Game.paused == false) {
            Game.paused = true
            pauseb.scale.setTo(-10)
            optb.revive ()
    }
},
    
    PauseESC: function() {
        window.onkeydown = function() {
            if (Game.input.keyboard.addKey(Phaser.Keyboard.ESC).isDown){
                Game.paused = !Game.paused;
            }
            if (pauseb.scale.setTo(-10) && Game.paused == false) {
                pauseb.scale.setTo(1.5)
            }
            if (Game.paused==false){
                optb.kill ()
            }
        }
    },




    actionOnClick2: function () {
        if (Game.paused) {
            
        }
    }
}