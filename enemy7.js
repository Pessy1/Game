const enemy7_create = function() {
    enemy7 = Game.add.sprite(4300, 2500,'Archerer')
    enemy7.scale.setTo(-0.6, 0.6)
    enemy7.anchor.setTo(0.5, 0)
    enemy7.health = 50
    enemy7.frame = 13

    healthbar_enemy7 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy7.width = enemy7.health
    healthbar_enemy7.scale.setTo(0.05)
    healthbar_enemy7.anchor.setTo(0.5, 1)
}

const enemy7_phys = function() {
    Game.physics.arcade.enable(enemy7)
    enemy7.body.gravity.y = 500
    enemy7.body.collideWorldBounds = true
    enemy7.body.setSize(90, 162, 60)
}

const enemy7_movment = function () {
    healthbar_enemy7.width = enemy7.health

    healthbar_enemy7.x = enemy7.x+6
    healthbar_enemy7.y = enemy7.y-5
}

const enemy7_shot = function() {
    if (enemy7.visible === true){
        shooting7()
    }
}

const enemy7_dying = function() {
    if (enemy7.health < 0){
        healthbar_enemy7.kill()
        enemy7.kill()
    }
}

const enemy7_damage = function() {
    if (pl.visible && enemy7.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy7.body)){
            pl.health -= 1
        }}
        
}

const enemy7_hit = function() {
    if (pl.visible && enemy7.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy7.body)){
            enemy7.health -= 5
            pl.health += 5.5
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy7.body)){
            enemy7.health -= 5
            pl.health += 5.5
        }
    }    
}

const enemy7_collision = function() {
    Game.physics.arcade.collide(enemy7, platform1)
    Game.physics.arcade.collide(enemy7, platform2)
    Game.physics.arcade.collide(enemy7, platform3)
    Game.physics.arcade.collide(enemy7, platform4)
    Game.physics.arcade.collide(enemy7, platform5)
}

const enemy7_revive = function() {
    healthbar_enemy7.revive()
    enemy7.revive()
    enemy7.health = 50
}