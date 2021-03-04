const arrow6_create = function() {
    arrow6 = arrow6s.create(enemy6.x, enemy6.y+32, 'arrow')
    arrow6.scale.setTo(-1)
    arrow6.animations.add('spin',[0,1],10,true).play()
    Game.physics.arcade.enable(arrow6)
    arrow6.body.velocity.x = -500
} 

const shooting6 = function() {
    if (arrow6s){
        enemy6.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow6_create()
    }
}

const arrow6_collision = function() {
    if (arrow6s && arrow6s.length > 0){
        arrow6s.forEach(element => {
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}
