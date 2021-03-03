const arrow2_create = function() {
    arrow2 = arrow2s.create(enemy2.x, enemy2.y+32, 'arrow')
    arrow2.scale.setTo(-1)
    arrow2.animations.add('spin',[0,1],10,true).play()
    Game.physics.arcade.enable(arrow2)
    arrow2.body.velocity.x = -500
} 

const shooting2 = function() {
    if (arrow2s){
        enemy2.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow2_create()
    }
}

const arrow2_collision = function() {
    if (arrow2s && arrow2s.length > 0){
        arrow2s.forEach(element => {
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}
