const enemy4_create = function() {
    enemy4 = Game.add.sprite(4300, 3400,'Archerer')
    enemy4.scale.setTo(0.6)
    enemy4.anchor.setTo(0.5, 0)
    enemy4.health = 50
    enemy4.frame = 13

    healthbar_enemy4 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy4.width = enemy4.health
    healthbar_enemy4.scale.setTo(0.05)
    healthbar_enemy4.anchor.setTo(0.5, 1)
}

const enemy4_phys = function() {
    Game.physics.arcade.enable(enemy4)
    enemy4.body.gravity.y = 500
    enemy4.body.collideWorldBounds = true
    enemy4.body.setSize(90, 162, 60)
}

const enemy4_movment = function () {
    healthbar_enemy4.width = enemy4.health

    healthbar_enemy4.x = enemy4.x+6
    healthbar_enemy4.y = enemy4.y-5
}

const enemy4_shot = function() {
    if (enemy4.visible === true){
        shooting4()
    }
}

const enemy4_dying = function() {
    if (enemy4.health < 0){
        healthbar_enemy4.kill()
        enemy4.kill()
    }
}

const enemy4_damage = function() {
    if (pl.visible && enemy4.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy4.body)){
            pl.health -= 1
        }}
        
}

const enemy4_hit = function() {
    if (pl.visible && enemy4.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy4.body)){
            enemy4.health -= 5
            pl.health += 5.5
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy4.body)){
            enemy4.health -= 5
            pl.health += 5.5
        }
    }    
}

const enemy4_collision = function() {
    Game.physics.arcade.collide(enemy4, platform1)
    Game.physics.arcade.collide(enemy4, platform2)
    Game.physics.arcade.collide(enemy4, platform3)
    Game.physics.arcade.collide(enemy4, platform4)
    Game.physics.arcade.collide(enemy4, platform5)
}

const enemy4_revive = function() {
    healthbar_enemy4.revive()
    enemy4.revive()
    enemy4.health = 50
}