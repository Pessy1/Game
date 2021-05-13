const arrow_right_create = function() {
    enemies_right.forEach(_enemy_right => {
        arrow_right = arrows_right.create(_enemy_right.x, _enemy_right.y+32, 'arrow')
        arrow_right.scale.setTo(1)
        arrow_right.animations.add('spin',[0,1],10,true).play()
        Game.physics.arcade.enable(arrow_right)
        arrow_right.body.velocity.x = 500
    })
    
} 

const shooting_right = function() {
    if (arrows_right){
        enemies_right.forEach(_enemy_right => {
            _enemy_right.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        })
        arrow_right_create()
    }
}

const arrow_right_collision = function() {
    if (arrows_right && arrows_right.length > 0){
        arrows_right.forEach(element => {
            element.checkWorldBounds = true
            element.outOfBoundsKill = true
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}

const arrow_create = function() {
    enemies.forEach(_enemy => {
        arrow = arrows.create(_enemy.x, _enemy.y+32, 'arrow')
        arrow.scale.setTo(-1)
        arrow.animations.add('spin',[0,1],10,true).play()
        Game.physics.arcade.enable(arrow)
        arrow.body.velocity.x = -500
    })
    
} 

const shooting = function() {
    if (arrows){
        enemies.forEach(_enemy => {
            _enemy.animations.add('shoot',[13,14,15,10,9,8],10,false).play()
        })
        arrow_create()
    }
}

const arrow_collision = function() {
    if (arrows && arrows.length > 0){
        arrows.forEach(element => {
            element.checkWorldBounds = true
            element.outOfBoundsKill = true
            if (pl.visible && element.visible){
                if (Phaser.Rectangle.intersects(pl.body, element.body)){
                    pl.health -= 10
                    element.kill()
                }
            }
        })
        
    }
}