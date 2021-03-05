const arrow7_create = function() {
    arrow7 = arrow7s.create(enemy7.x, enemy7.y+32, 'arrow')
    arrow7.scale.setTo(1)
    arrow7.animations.add('spin',[0,1],10,true).play()
    Game.physics.arcade.enable(arrow7)
    arrow7.body.velocity.x = 500
} 

const shooting7 = function() {
    if (arrow7s){
        enemy7.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        arrow7_create()
    }
}

const arrow7_collision = function() {
    if (arrow7s && arrow7s.length > 0){
        arrow7s.forEach(element => {
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}
