const controlsState = {
    create: function () {
        Game.backg=Game.add.image(1,1,'MenuBg')

        Game.back=Game.add.button (1,1,'back',this.actionOnClick,Game)
        

        Game.AiD=Game.add.sprite (Game.width/2,Game.height/2-175,'A&D&Space')
        Game.AiD.anchor.setTo (0.5)
        Game.AiD.scale.setTo(0.2)

        Game.mauce
    },

    actionOnClick: function () {
        Game.state.start ('Options')
    }
}