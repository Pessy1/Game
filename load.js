const loadState = {
    
    preload: function () {
    Game.backg=Game.add.image(1,1,'MenuBg')
    Game.redy = false
    Game.loading = Game.add.sprite (Game.width/2-40,Game.height/2,'Loading')
    Game.loading.anchor.setTo(0.5)
    Game.loadingBar=Game.add.sprite(Game.width/2,Game.height/2+170,'preloadBar')
    Game.loadingBar.anchor.setTo(0.5)
    Game.loadingBar.animations.add ('loadingBar',[0,1,2,3,4,5],3,true).play()
    Game.loadingDots=Game.add.sprite(Game.width/2+420,Game.height/2+25,'dots')
    Game.loadingDots.animations.add ('loadingDots',[0,1,2,3],3,true)
    Game.loadingDots.animations.play ('loadingDots')
    Game.load.image("strelka", "Assets/strelka.png")
    Game.load.image("game_over", "Assets/GameScreens/over.png")
    Game.load.image("restart", "Assets/GameScreens/restart.png")
    Game.load.image('title', 'Assets/GameScreens/title.png')
    Game.load.image('zero_diamonds', 'Assets/GameScreens/zero_diamonds.png')
    Game.load.spritesheet ('player','Assets/Player/Player_left_right.png',701/14.05,587/16.38)
    Game.load.image('attack_left', 'Assets/Player/attack_left.png')
    Game.load.image('attack_right', 'Assets/Player/attack_right.png')
    Game.load.image('dash_right', 'Assets/Player/dash_right.png')
    Game.load.image('dash_left', 'Assets/Player/dash_left.png')
    Game.load.audio('music', "Assets/Sound effects/Cave Story OST Mimiga Town Extended Version.mp3")
    Game.load.audio("jumpsound", "Assets/Sound effects/Jump.wav")
    Game.load.audio("footstep", "Assets/Sound effects/Footstep1.wav")
    Game.load.image("plat1", "Assets/Platforms/platform 1.png")
    Game.load.image("plat2", "Assets/Platforms/platform 2.png")
    Game.load.image("plat3", "Assets/Platforms/platform_3.png")
    Game.load.image("plat4", "Assets/Platforms/platform 4.png")
    Game.load.image("plat5", "Assets/Platforms/platform 5.png")
    Game.load.spritesheet ('Archerer', 'Assets/Enemies/Archer/Archerer.png',680/4,680/4)
    Game.load.spritesheet ('Hound', 'Assets/Enemies/Hount/hell-hound-run.png',335/5,32)
    Game.load.image('healthbar', 'Assets/platform.jpg')
    Game.load.spritesheet ('arrow','Assets/Enemies/Archer/Move.png',48/2,5)
    Game.load.image('redflag', 'Assets/redflag.png')
    Game.load.image("strelka", "Assets/strelka.png")
    Game.load.image("silver", "Assets/silver.png")
    Game.load.image("titleScreen", "Assets/MainMenuBackGround.png")
    Game.load.image('button','Assets/blue.png')
    Game.load.image('bg','Assets/background.png')
    Game.load.spritesheet('playb','Assets/Buttons/PlayButton.png',257/2,36)
    Game.load.image("button", "Assets/blue.png")
    Game.load.image('optb','Assets/Buttons/OptionsButton.png')
    Game.load.spritesheet ('mute','Assets/Buttons/MuteButton.png',310/2,35)
    Game.load.image ('back','Assets/Buttons/BackButton.png')
    Game.load.image ('quit','Assets/Buttons/QuitButton.png')
    Game.load.image ('pause','Assets/Buttons/PauseButton.png')
    Game.load.image ('quit','Assets/Buttons/ResumeButton.png')
    Game.load.spritesheet('full','Assets/Buttons/FullscreenButton.png', 645/2, 34)
    Game.load.image ('controls','Assets/Buttons/ControlsButton.png')
    Game.load.audio('button', "Assets/Sound effects/UIHoverAmongUsMenuButton-SoundEffectforediting.mp3")
    Game.load.image ('hoverbg','Assets/HoverBg.png')
    Game.load.image ('A&D&Space','Assets/Controls/A&D&Sapce.png')
    Game.load.image ('mauce','Assets/mouse-left-click-icon-15056.png')
    },

    create: function() {
    Game.loadingBar.cropEnable = false
    },

    update: function() {
        if (Game.cache.isSoundDecoded('music')&&Game.cache.isSoundDecoded('jumpsound')&&Game.cache.isSoundDecoded('footstep')&&Game.redy==false){
            Game.redy = true
            Game.state.start('MainMenu')
        }
    }

}