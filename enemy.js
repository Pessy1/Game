const enemy_right_create = function(x, y) {
    enemies_right.create(x, y,'Archerer')
    enemies_right.forEach(_enemy_right =>{
        _enemy_right.scale.setTo(-0.6, 0.6)
        _enemy_right.anchor.setTo(0.5, 0)
        _enemy_right.health = 50
        _enemy_right.frame = 13
        Game.physics.arcade.enable(_enemy_right)
        _enemy_right.body.gravity.y = 500
        _enemy_right.body.collideWorldBounds = true
        _enemy_right.body.setSize(90, 162, 60)
    })
}

const enemy_right_phys = function() {
    
}

const enemy_right_movement = function () {
}

const enemy_right_shot = function() {
    enemies_right.forEach(_enemy_right => {
        if (_enemy_right.visible === true){
            shooting_right()
        }
    })
}

const enemy_right_dying = function() {
    enemies_right.forEach(_enemy_right => {
            if (_enemy_right.health < 0){
                _enemy_right.kill()
                enemies_right.remove(_enemy_right)
            }
    })
    
}

const enemy_right_damage = function() {
    enemies_right.forEach(_enemy_right => {
        if (pl.visible && _enemy_right.visible){
            if (Phaser.Rectangle.intersects(pl.body, _enemy_right.body)){
                pl.health -= 1
            }}
    })
        
}

const enemy_right_hit = function() {
    enemies_right.forEach(_enemy_right => {
        if (pl.visible && _enemy_right.visible){
            if (Phaser.Rectangle.intersects(attacker.body, _enemy_right.body)){
                _enemy_right.health -= 5
                pl.health += 5.5
            }
            if (Phaser.Rectangle.intersects(attacker1.body, _enemy_right.body)){
                _enemy_right.health -= 5
                pl.health += 5.5
            }
        }    
    })
}

const enemy_right_collision = function() {
    enemies_right.forEach(_enemy_right => {
        Game.physics.arcade.collide(_enemy_right, ground)
    })
}

const enemy_right_revive = function() {
    enemy_right.revive()
    enemy_right.health = 50
}
const enemy_create = function(x, y) {
    enemies.create(x, y,'Archerer')
    enemies.forEach(_enemy =>{
        _enemy.scale.setTo(0.6)
        _enemy.anchor.setTo(0.5, 0)
        _enemy.health = 50
        _enemy.frame = 13
        Game.physics.arcade.enable(_enemy)
        _enemy.body.gravity.y = 500
        _enemy.body.collideWorldBounds = true
        _enemy.body.setSize(90, 162, 60)
    })
}

const enemy_phys = function() {
    
}

const enemy_movment = function () {
}

const enemy_shot = function() {
    enemies.forEach(_enemy => {
        if (_enemy.visible === true){
            shooting()
        }
    })
}

const enemy_dying = function() {
    enemies.forEach(_enemy => {
            if (_enemy.health < 0){
                _enemy.kill()
                enemies.remove(_enemy)
            }
    })
    
}

const enemy_damage = function() {
    enemies.forEach(_enemy => {
        if (pl.visible && _enemy.visible){
            if (Phaser.Rectangle.intersects(pl.body, _enemy.body)){
                pl.health -= 1
            }}
    })
        
}

const enemy_hit = function() {
    enemies.forEach(_enemy => {
        if (pl.visible && _enemy.visible){
            if (Phaser.Rectangle.intersects(attacker.body, _enemy.body)){
                _enemy.health -= 5
                pl.health += 5.5
            }
            if (Phaser.Rectangle.intersects(attacker1.body, _enemy.body)){
                _enemy.health -= 5
                pl.health += 5.5
            }
        }    
    })
}

const enemy_collision = function() {
    enemies.forEach(_enemy => {
        Game.physics.arcade.collide(_enemy, ground)
    })
}

const enemy_revive = function() {
    enemy.revive()
    enemy.health = 50
}