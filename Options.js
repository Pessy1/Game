const optionsState = {
    create: function () {
        Game.backg=Game.add.image(1,1,'MenuBg')
        Game.mute = Game.add .button (Game.world.centerX,Game.world.centerY,'mute',this.actionOnClick,Game)
        Game.mute.anchor.setTo(0.5)
        Game.mute.animations.add ('mute',[0,1],100,false)
        Game.mute.animations.add ('mute2',[1,0],100,false)
        Game.back=Game.add.button (1,1,'back',this.actionOnClick2)

        Game.fullscreen = Game.add .button (Game.world.centerX,Game.world.centerY-75,'full',this.actionOnClick3,Game)
        Game.fullscreen.animations.frame = 1
        Game.fullscreen.anchor.setTo (0.5)

        Game.controls = Game.add.button (Game.world.centerX, Game.world.centerY+75,'controls',this.actionOnClick4,Game)
        Game.controls.anchor.setTo (0.5)

        Game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT
      
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