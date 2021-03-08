const optionsState = {
    create: function () {
        Game.backg=Game.add.image(1,1,'MenuBg')
        Game.mute = Game.add .button (Game.world.centerX,Game.world.centerY,'mute',this.actionOnClick,Game)
        Game.mute.anchor.setTo(0.5)
        Game.mute.animations.add ('mute',[0,1],100,false)
        Game.mute.animations.add ('mute2',[1,0],100,false)
      
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

    update: function () {
    },

    update: function () {
    } 
}