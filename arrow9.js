const arrow9_create = function() {
    arrow9 = arrow9s.create(enemy9.x, enemy9.y+32, 'arrow')
    arrow9.scale.setTo(-1)
    arrow9.animations.add('spin',[0,1],10,true).play()
    Game.physics.arcade.enable(arrow9)
    arrow9.body.velocity.x = -500
} 

const shooting9 = function() {
    if (arrow9s){
        enemy9.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow9_create()
    }
}

const arrow9_collision = function() {
    if (arrow9s && arrow9s.length > 0){
        arrow9s.forEach(element => {
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}
