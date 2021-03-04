const arrow4_create = function() {
    arrow4 = arrow4s.create(enemy4.x, enemy4.y+32, 'arrow')
    arrow4.scale.setTo(-1)
    arrow4.animations.add('spin',[0,1],10,true).play()
    Game.physics.arcade.enable(arrow4)
    arrow4.body.velocity.x = -500
} 

const shooting4 = function() {
    if (arrow4s){
        enemy4.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow4_create()
    }
}

const arrow4_collision = function() {
    if (arrow4s && arrow4s.length > 0){
        arrow4s.forEach(element => {
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}
