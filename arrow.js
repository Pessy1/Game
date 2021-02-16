const arrow_create = function() {
    arrow = Game.add.sprite(enemy.x, enemy.y+32, 'arrow')
    arrow.scale.setTo(-1)
    Game.physics.arcade.enable(arrow)
} 

const shooting = function() {
    if (shot_counter === 70){
        enemy.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow_create()
        shot_counter = 0
    }
    
    if (arrow){
        arrow.animations.add('spin',[0,1],10,true).play()
        arrow.body.x -= 20
        Game.physics.arcade.enable(arrow)
        if (pl.visible && arrow.visible){
            if (Phaser.Rectangle.intersects(pl.body, arrow.body)){
                pl.health -= 10
                arrow.kill()
                console.log(1)
            }
        }
    }
}

