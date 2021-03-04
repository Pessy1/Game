const arrow5_create = function() {
    arrow5 = arrow5s.create(enemy5.x, enemy5.y+32, 'arrow')
    arrow5.scale.setTo(-1)
    arrow5.animations.add('spin',[0,1],10,true).play()
    Game.physics.arcade.enable(arrow5)
    arrow5.body.velocity.x = -500
} 

const shooting5 = function() {
    if (arrow5s){
        enemy5.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow5_create()
    }
}

const arrow5_collision = function() {
    if (arrow5s && arrow5s.length > 0){
        arrow5s.forEach(element => {
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}
