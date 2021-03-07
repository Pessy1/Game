const MainMenuState = {

    preload: function (){
        Game.load.image("button", "Assets/blue.png")
    },


    create: function () {
        Game.backg=Game.add.tileSprite(0,0,5000,10000,'MenuBg').scale.setTo (3.1,4)
        Game.button = Game.add.button (Game.world.centerX,Game.world.centerY,'button',this.actionOnClick,Game)
        Game.button.anchor.setTo(0.5)
    },

    actionOnClick: function () {
        Game.state.start ('play')
    }
}