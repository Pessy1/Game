const enemy6_create = function() {
    enemy6 = Game.add.sprite(8300, 4000,'Archerer')
    enemy6.scale.setTo(0.6)
    enemy6.anchor.setTo(0.5, 0)
    enemy6.health = 50
    enemy6.frame = 13

    healthbar_enemy6 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy6.width = enemy6.health
    healthbar_enemy6.scale.setTo(0.05)
    healthbar_enemy6.anchor.setTo(0.5, 1)
}

const enemy6_phys = function() {
    Game.physics.arcade.enable(enemy6)
    enemy6.body.gravity.y = 500
    enemy6.body.collideWorldBounds = true
    enemy6.body.setSize(90, 162, 60)
}

const enemy6_movment = function () {
    healthbar_enemy6.width = enemy6.health

    healthbar_enemy6.x = enemy6.x+6
    healthbar_enemy6.y = enemy6.y-5
}

const enemy6_shot = function() {
    if (enemy6.visible === true){
        shooting6()
    }
}

const enemy6_dying = function() {
    if (enemy6.health < 0){
        healthbar_enemy6.kill()
        enemy6.kill()
    }
}

const enemy6_damage = function() {
    if (pl.visible && enemy6.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy6.body)){
            pl.health -= 1
        }}
        
}

const enemy6_hit = function() {
    if (pl.visible && enemy6.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy6.body)){
            enemy6.health -= 5
            pl.health += 5
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy6.body)){
            enemy6.health -= 5
            pl.health += 5
        }
    }    
}

const enemy6_collision = function() {
    Game.physics.arcade.collide(enemy6, platform1)
    Game.physics.arcade.collide(enemy6, platform2)
    Game.physics.arcade.collide(enemy6, platform3)
    Game.physics.arcade.collide(enemy6, platform4)
    Game.physics.arcade.collide(enemy6, platform5)
}

const enemy6_revive = function() {
    healthbar_enemy6.revive()
    enemy6.revive()
    enemy6.health = 50
}