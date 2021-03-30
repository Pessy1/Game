
const bootState = {
    preload: function() {
        Game.load.image('MenuBg','Assets/MainMenuBackGround.png')
        Game.load.spritesheet ('preloadBar','Assets/LoadingBar.png',3732/6,149/1)
        Game.load.image ('Loading','Assets/Loading.png')
        Game.load.spritesheet ('dots','Assets/dots.png',428/4,37/1)
    },

    create: function () {
        Game.backg=Game.add.tileSprite(0,0,5000,1000,'MenuBg').scale.setTo (1.7,2)
        Game.state.start ('load')
    },

    update: function () {
    }
}