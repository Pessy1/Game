const dieState = {
    create: function () {
        Game.backg=Game.add.image(1,1,'MenuBg')
        Game.title=Game.add.image (Game.world.centerX,Game.world.centerY-225,"title")
        Game.title.anchor.setTo(0.5)
        Game.title.scale.setTo(2)

        Game.hoverbg = Game.add.sprite (Game.title.x,Game.world.centerY-75,'hoverbg')
        Game.hoverbg.anchor.setTo (0.5)
        Game.hoverbg.alpha = 0
        Game.hoverbg.scale.setTo(0.55,0.8)

        Game.hoverbg2 = Game.add.sprite (Game.world.centerX,Game.world.centerY,'hoverbg')
        Game.hoverbg2.anchor.setTo (0.5)
        Game.hoverbg2.alpha = 0
        Game.hoverbg2.scale.setTo(0.7,0.9)

        Game.hoverbg3 = Game.add.sprite (Game.world.centerX,Game.world.centerY+75,'hoverbg')
        Game.hoverbg3.anchor.setTo (0.5)
        Game.hoverbg3.alpha = 0
        Game.hoverbg3.scale.setTo(0.45,0.9)

        Game.button = Game.add .button (Game.title.x,Game.world.centerY-75,'playb',this.actionOnClick,Game)
        Game.button.anchor.setTo(0.5)
        Game.button.animations.add ('hover',[0,1,0],6,false)

        Game.button2 = Game.add .button (Game.world.centerX,Game.world.centerY,'optb',this.actionOnClick2,Game)
        Game.button2.anchor.setTo(0.5)

        Game.button3=Game.add .button (Game.world.centerX,Game.world.centerY+75,'quit',this.actionOnClick3,Game)
        Game.button3.anchor.setTo(0.5)

        Game.buttonSound = Game.add.audio ("button",0.5,)

        Game.button.inputEnabled = true
        Game.button2.inputEnabled = true
        Game.button.inputEnabled = true

        Game.button.events.onInputOver.add (function () {
            
            Game.buttonSound.play()
        Game.hoverbg.alpha = 0.8
            Game.button.animations.play('hover')
        })
        Game.button.events.onInputOut.add (function () {
            Game.buttonSound.stop ()
            Game.hoverbg.alpha = 0
        })
        Game.button2.events.onInputOver.add (function () {
            Game.buttonSound.play ()
            Game.hoverbg2.alpha = 0.8
            Game.button2.animations.play('hover')
        })
        Game.button2.events.onInputOut.add (function () {
            Game.buttonSound.stop ()
            Game.hoverbg2.alpha = 0
        })
        Game.button3.events.onInputOver.add (function () {
            Game.buttonSound.play ()
            Game.hoverbg3.alpha = 0.8
            Game.button3.animations.play('hover')
        })
        Game.button3.events.onInputOut.add (function () {
            Game.buttonSound.stop ()
            Game.hoverbg3.alpha = 0
        })
    },

    actionOnClick: function () {
        Game.state.start ('play')
    },

    actionOnClick2: function () {
        Game.state.start ('Options')
    },

    actionOnClick3: function () {
        Game.state.start ('MainMenu')
    }
}