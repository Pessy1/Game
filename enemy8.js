const enemy8_create = function() {
    enemy8 = Game.add.sprite(7700, 3100,'Archerer')
    enemy8.scale.setTo(-0.6, 0.6)
    enemy8.anchor.setTo(0.5, 0)
    enemy8.health = 50
    enemy8.frame = 13

    healthbar_enemy8 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy8.width = enemy8.health
    healthbar_enemy8.scale.setTo(0.05)
    healthbar_enemy8.anchor.setTo(0.5, 1)
}

const enemy8_phys = function() {
    Game.physics.arcade.enable(enemy8)
    enemy8.body.gravity.y = 500
    enemy8.body.collideWorldBounds = true
    enemy8.body.setSize(90, 162, 60)
}

const enemy8_movment = function () {
    healthbar_enemy8.width = enemy8.health

    healthbar_enemy8.x = enemy8.x+6
    healthbar_enemy8.y = enemy8.y-5
}

const enemy8_shot = function() {
    if (enemy8.visible === true){
        shooting8()
    }
}

const enemy8_dying = function() {
    if (enemy8.health < 0){
        healthbar_enemy8.kill()
        enemy8.kill()
    }
}

const enemy8_damage = function() {
    if (pl.visible && enemy8.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy8.body)){
            pl.health -= 1
        }}
        
}

const enemy8_hit = function() {
    if (pl.visible && enemy8.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy8.body)){
            enemy8.health -= 5
            pl.health += 5.5
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy8.body)){
            enemy8.health -= 5
            pl.health += 5.5
        }
    }    
}

const enemy8_collision = function() {
    Game.physics.arcade.collide(enemy8, platform1)
    Game.physics.arcade.collide(enemy8, platform2)
    Game.physics.arcade.collide(enemy8, platform3)
    Game.physics.arcade.collide(enemy8, platform4)
    Game.physics.arcade.collide(enemy8, platform5)
}

const enemy8_revive = function() {
    healthbar_enemy8.revive()
    enemy8.revive()
    enemy8.health = 50
}