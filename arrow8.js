const arrow8_create = function() {
    arrow8 = arrow8s.create(enemy8.x, enemy8.y+32, 'arrow')
    arrow8.scale.setTo(1)
    arrow8.animations.add('spin',[0,1],10,true).play()
    Game.physics.arcade.enable(arrow8)
    arrow8.body.velocity.x = 500
} 

const shooting8 = function() {
    if (arrow8s){
        enemy8.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow8_create()
    }
}

const arrow8_collision = function() {
    if (arrow8s && arrow8s.length > 0){
        arrow8s.forEach(element => {
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}
