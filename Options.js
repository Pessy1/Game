const optionsState = {
    create: function () {
        Game.backg=Game.add.image(1,1,'MenuBg')
        Game.hoverbg_mute = Game.add.sprite (Game.world.centerX,Game.world.centerY,'hoverbg')
        Game.hoverbg_mute.anchor.setTo (0.5)
        Game.hoverbg_mute.alpha = 0
        Game.hoverbg_mute.scale.setTo(0.65,1)
        Game.mute = Game.add .button (Game.world.centerX,Game.world.centerY,'mute',this.actionOnClick,Game)
        Game.mute.anchor.setTo(0.5)
        Game.mute.animations.add ('mute',[0,1],100,false)
        Game.mute.animations.add ('mute2',[1,0],100,false)
        Game.hoverbg_back = Game.add.sprite (1,1,'hoverbg')
        Game.hoverbg_back.anchor.setTo (0)
        Game.hoverbg_back.alpha = 0
        Game.hoverbg_back.scale.setTo(0.42,0.73)
        Game.back=Game.add.button (1,1,'back',this.actionOnClick2)

        Game.hoverbg_fullscreen = Game.add.sprite (Game.world.centerX,Game.world.centerY-75,'hoverbg')
        Game.hoverbg_fullscreen.anchor.setTo (0.5)
        Game.hoverbg_fullscreen.alpha = 0
        Game.hoverbg_fullscreen.scale.setTo(1.2,1)
        Game.fullscreen = Game.add .button (Game.world.centerX,Game.world.centerY-75,'full',this.actionOnClick3,Game)
        Game.fullscreen.animations.frame = 1
        Game.fullscreen.anchor.setTo (0.5)

        Game.hoverbg_controls = Game.add.sprite (Game.world.centerX, Game.world.centerY+75,'hoverbg')
        Game.hoverbg_controls.anchor.setTo (0.5)
        Game.hoverbg_controls.alpha = 0
        Game.hoverbg_controls.scale.setTo(0.7,1)
        Game.controls = Game.add.button (Game.world.centerX, Game.world.centerY+75,'controls',this.actionOnClick4,Game)
        Game.controls.anchor.setTo (0.5)

        Game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT

        Game.back.events.onInputOver.add (function () {
            Game.buttonSound.play()
        Game.hoverbg_back.alpha = 0.8
            Game.button.animations.play('hover')
        })
        Game.back.events.onInputOut.add (function () {
            Game.buttonSound.stop ()
            Game.hoverbg_back.alpha = 0
        })

        Game.fullscreen.events.onInputOver.add (function () {
            Game.buttonSound.play()
        Game.hoverbg_fullscreen.alpha = 0.8
            Game.button.animations.play('hover')
        })
        Game.fullscreen.events.onInputOut.add (function () {
            Game.buttonSound.stop ()
            Game.hoverbg_fullscreen.alpha = 0
        })

        Game.mute.events.onInputOver.add (function () {
            Game.buttonSound.play()
        Game.hoverbg_mute.alpha = 0.8
            Game.button.animations.play('hover')
        })
        Game.mute.events.onInputOut.add (function () {
            Game.buttonSound.stop ()
            Game.hoverbg_mute.alpha = 0
        })

        Game.controls.events.onInputOver.add (function () {
            Game.buttonSound.play()
        Game.hoverbg_controls.alpha = 0.8
            Game.button.animations.play('hover')
        })
        Game.controls.events.onInputOut.add (function () {
            Game.buttonSound.stop ()
            Game.hoverbg_controls.alpha = 0
        })
      
    },

    actionOnClick: function () {
    if (!Game.sound.mute){
        Game.sound.mute = true
        Game.mute.animations.play ('mute')
        }else {
            Game.sound.mute = false
            Game.mute.animations.play ('mute2')
        }
    },

    actionOnClick2: function () {
        Game.state.start ('MainMenu')
    },

    actionOnClick3: function () {
        Game.fullscreen.animations.play ('offToOn')
        Game.scale.startFullScreen(true)
        Game.fullscreen.animations.frame = 0
        if (Game.scale.isFullScreen){
            Game.scale.stopFullScreen(true)
            Game.fullscreen.animations.frame = 1
        }
    },

    actionOnClick4: function () {
        Game.state.start ('Controls')
    }
}