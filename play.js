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
    pl.kill()
    }
}