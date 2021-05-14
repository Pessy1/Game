
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
    if (pl.visible) {
        pl.health -= 0.1
    }

    if (dashing !== 50){
        dashing += 1
    }

    let flag1 = Game.physics.arcade.collide(pl, platform1)
    let flag2 = Game.physics.arcade.collide(pl, platform2)
    let flag3 = Game.physics.arcade.collide(pl, platform3)
    let flag4 = Game.physics.arcade.collide(pl, platform4)
    let flag5 = Game.physics.arcade.collide(pl, platform5)
    let falg6 = Game.physics.arcade.collide(pl, plat_hound)
    let falg7 = Game.physics.arcade.collide(pl, plat_hound2)
    let falg8 = Game.physics.arcade.collide(pl, plat_hound3)
    let flag9 = Game.physics.arcade.collide(pl.body, ground.body)

    if (Game.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
        pl.body.velocity.x=-speed
        backg.tilePosition.x += 0.5
        if (pl.body.touching.down === true||flag9===true){
        pl.animations.play('Running_left')
        }
        direction = 'left'
    }else if (Game.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
        pl.body.velocity.x = +speed
        backg.tilePosition.x -= 0.5
        if (pl.body.touching.down === true){
        pl.animations.play('Running')
    }
        direction = 'right'
    }else if(direction === 'right'&&pl.body.touching.down === true){
        (pl.animations.play('Idle'))
    }else if (direction === 'left'&&pl.body.touching.down === true){
        pl.animations.play('Idle_left')
    }
    if ((!((Game.input.keyboard.addKey(Phaser.Keyboard.A).repeats % 30)) || !((Game.input.keyboard.addKey(Phaser.Keyboard.D).repeats % 30))) & Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isUp && pl.body.touching.down === true) {
        footstep.play()
    }

    if (dashing === 50){
        if (dash !== 10){
            if (Game.input.keyboard.addKey(Phaser.Keyboard.SHIFT).isDown)
            {   
                dasher = 1
                if(direction === 'right'){
                    dash += 1
                    pl.body.velocity.x = speed*5
                }
                if(direction === 'left'){
                    dash += 1
                    pl.body.velocity.x = -speed*5
                }
            }else {dasher = 0}
        }else if (dash === 10){
            dash = 0
            dashing = 0
        }
    }

    if (dasher === 1){
        pl.animations.add('Invisible',[222],4).play()
        if(direction === 'right'){
            dash1.scale.setTo(3.2)
            dash2.scale.setTo(0)
        }
        else if (direction === 'left'){
            dash2.scale.setTo(3.2)
            dash1.scale.setTo(0)
        }
    }else if (dasher === 0){
        if(ground_check === true){
            dash1.scale.setTo(0)
            dash2.scale.setTo(0)
        }
        if(ground_check === false&&jumping === 0&&dash1.scale.setTo(0)&&dash2.scale.setTo(0)){
            if (direction === 'right'){
                pl.animations.play('Top')
            }
            if (direction === 'left'){
                pl.animations.play('Top_left')
            }
        }
    }
        
        //else if (pl.body.touching.down === false){
        //if(direction === 'right'){
            //pl.animations.play('Top',10,false)
        //}else if (direction === 'left'){
           //pl.animations.play('Top_left')
        //}
    //}
    
}

const deadly_void = function(){
    if (pl.y > 4000){
        fall = true
    }
}

const attack_player = function(){
    if ((pl.body.touching.down === true && pl.visible === true)||(ground_check === true && pl.visible === true)){
        if (Game.input.activePointer.leftButton.justPressed()){
            attack = 1
        }else {attack = 0}
    }
    console.log(attack)
}

const animate_player = function() {
    if (Game.input.keyboard.addKey(Phaser.Keyboard.A).isDown){
        pl.animations.play('Running_left')
    }else if (Game.input.keyboard.addKey(Phaser.Keyboard.D).isDown){
        pl.animations.play('Running')
    }else if(direction === 'right'){
        (pl.animations.play('Idle'))
    }else if (direction === 'left'){
        pl.animations.play('Idle_left')
    }
    if ((!((Game.input.keyboard.addKey(Phaser.Keyboard.A).repeats % 30)) || !((Game.input.keyboard.addKey(Phaser.Keyboard.D).repeats % 30))) & Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isUp) {
        footstep.play()
    }
    
    if (Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).isDown)
    {  
            jumping = 1
        if (Game.time.now > jumpTimer && attack === 0){
            pl.body.velocity.y = -750
            jumpTimer = Game.time.now + 750
            jumpsound.play()
            if(direction === 'right'){
                pl.animations.play('Jump',10,false)
            }else if (direction === 'left'){
                pl.animations.play('Jump_left')} 
        }
    }else {jumping = 0}
    ground_check = true
}