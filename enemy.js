const enemy_create = function() {
    enemy = Game.add.sprite(650, 5000,'Archerer')
    enemy.scale.setTo(0.6)
    enemy.anchor.setTo(0.5, 0)
    enemy.health = 50
    enemy.frame = 13

    healthbar_enemy = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy.width = enemy.health
    healthbar_enemy.scale.setTo(0.05)
    healthbar_enemy.anchor.setTo(0.5, 1)
}

const enemy_phys = function() {
    Game.physics.arcade.enable(enemy)
    enemy.body.gravity.y = 500
    enemy.body.collideWorldBounds = true
    enemy.body.setSize(90, 162, 60)
}

const enemy_movment = function () {
    healthbar_enemy.width = enemy.health

    healthbar_enemy.x = enemy.x+6
    healthbar_enemy.y = enemy.y-5
}

const enemy_shot = function() {
    if (enemy.visible === true){
        shooting()
    }
}

const enemy_dying = function() {
    if (enemy.health < 0){
        healthbar_enemy.kill()
        enemy.kill()
    }
}

const enemy_damage = function() {
    if (pl.visible && enemy.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy.body)){
            pl.health -= 1
        }}
        
}

const enemy_hit = function() {
    if (pl.visible && enemy.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy.body)){
            enemy.health -= 5
            pl.health += 5.5
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy.body)){
            enemy.health -= 5
            pl.health += 5.5
        }
    }    
}

const enemy_collision = function() {
    Game.physics.arcade.collide(enemy, platform1)
    Game.physics.arcade.collide(enemy, platform2)
    Game.physics.arcade.collide(enemy, platform3)
    Game.physics.arcade.collide(enemy, platform4)
    Game.physics.arcade.collide(enemy, platform5)
}

const enemy_revive = function() {
    healthbar_enemy.revive()
    enemy.revive()
    enemy.health = 50
}