const arrow3_create = function() {
    arrow3 = arrow3s.create(enemy3.x, enemy3.y+32, 'arrow')
    arrow3.scale.setTo(1)
    arrow3.animations.add('spin',[0,1],10,true).play()
    Game.physics.arcade.enable(arrow3)
    arrow3.body.velocity.x = 500
} 

const shooting3 = function() {
    if (arrow3s){
        enemy3.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow3_create()
    }
}

const arrow3_collision = function() {
    if (arrow3s && arrow3s.length > 0){
        arrow3s.forEach(element => {
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}
