const arrow_create = function() {
    arrow = arrows.create(enemy.x, enemy.y+32, 'arrow')
    arrow.scale.setTo(-1)
    arrow.animations.add('spin',[0,1],10,true).play()
    Game.physics.arcade.enable(arrow)
    arrow.body.velocity.x = -500
} 

const shooting = function() {
    if (shot_counter === 70){
        enemy.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow_create()
        shot_counter = 0
    }
    
    if (arrows && arrows.length > 0){
        arrows.forEach(element => {
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}