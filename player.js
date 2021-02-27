const playerf = function () {
    
    pl=Game.add.sprite (3800, 3300,'player')
    pl.anchor.setTo(0.5, 0)
    pl.scale.setTo(3)
    pl.health = 80
    Game.physics.enable (pl)
    pl.body.collideWorldBounds = true
    pl.body.gravity.y = 400
    pl.body.setSize (25,31, 15)
    console.log(pl.body.width)
    console.log(pl.body.height)
}
const plAnim = function() {
    pl.animations.add('Idle',[7,8,9,10],4.8,true)
    pl.animations.add('Idle_left', [6,5,4,3],4.8,true)
    pl.animations.add('Running',[22,23,24,25,26,27],6.5)
    pl.animations.add('Running_left',[19,18,17,16,15,14],6.5)
    pl.animations.add('Jump',[35,36,37,38,39,40,41,49,50],10,false)
    pl.animations.add('Jump_left',[34,33,32,31,30,29,28,48,47],10)
    pl.animations.add('Top',[51],10)
    pl.animations.add('Top_left',[46],10)
}
const playermovment = function (){
    pl.body.velocity.x=0

    let flag1 = Game.physics.arcade.collide(pl, platform1)
    let flag2 = Game.physics.arcade.collide(pl, platform2)
    let flag3 = Game.physics.arcade.collide(pl, platform3)
    let flag4 = Game.physics.arcade.collide(pl, platform4)
    let flag5 = Game.physics.arcade.collide(pl, platform5)

    if (Game.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
        pl.body.velocity.x=-speed
        if (pl.body.touching.down){
        pl.animations.play('Running_left')
        }
        direction = 'left'
    }else if (Game.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
        pl.body.velocity.x = +speed
        if (pl.body.touching.down){
        pl.animations.play('Running')
    }
        direction = 'right'
    }else if(direction === 'right'&&pl.body.touching.down){
        (pl.animations.play('Idle'))
    }else if (direction === 'left'&&pl.body.touching.down){
        pl.animations.play('Idle_left')
    }
    if ((!((Game.input.keyboard.addKey(Phaser.Keyboard.A).repeats % 30)) || !((Game.input.keyboard.addKey(Phaser.Keyboard.D).repeats % 30))) & Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isUp && pl.body.touching.down) {
        footstep.play()
    }
    
    if (Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown && pl.body.touching.down && Game.time.now > jumpTimer)
    {
        pl.body.velocity.y = -500
        jumpTimer = Game.time.now + 750
        jumpsound.play()
        if(direction === 'right'){
            pl.animations.play('Jump',10,false)
        }else if (direction === 'left'){
           pl.animations.play('Jump_left')} 
    }
    if (pl.body.onFloor() === false&&pl.body.velocity.y<-500){
         if(direction === 'right'){
            pl.animations.play('Top',10,false)
        }else if (direction === 'left'){
           pl.animations.play('Top_left')
        }
    }
    
}