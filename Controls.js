const controlsState = {
    create: function () {
        Game.backg=Game.add.image(1,1,'MenuBg')

        Game.back=Game.add.button (1,1,'back',this.actionOnClick,Game)
        
    },

    actionOnClick: function () {
        Game.state.start ('Options')
    }
}