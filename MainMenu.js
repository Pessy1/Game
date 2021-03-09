const MainMenuState = {
    create: function () {
        Game.backg=Game.add.image(1,1,'MenuBg')
        Game.title=Game.add.image (Game.world.centerX,Game.world.centerY-225,"title")
        Game.title.anchor.setTo(0.5)
        Game.title.scale.setTo(2)

        Game.button = Game.add .button (Game.title.x,Game.world.centerY-75,'playb',this.actionOnClick,Game)
        Game.button.anchor.setTo(0.5)
        Game.button2 = Game.add .button (Game.world.centerX,Game.world.centerY,'optb',this.actionOnClick2,Game)
        Game.button2.anchor.setTo(0.5)
        Game.button3=Game.add .button (Game.world.centerX,Game.world.centerY+75,'quit',this.actionOnClick3,Game)
        Game.button3.anchor.setTo(0.5)
    },

    actionOnClick: function () {
        Game.state.start ('play')
    },

    actionOnClick2: function () {
        Game.state.start ('Options')
    },

    actionOnClick3: function () {
        window.close ()
    }
}