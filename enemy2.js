const enemy2_create = function() {
    enemy2 = Game.add.sprite(700, 4100,'Archerer')
    enemy2.scale.setTo(0.6)
    enemy2.anchor.setTo(0.5, 0)
    enemy2.health = 50
    enemy2.frame = 13

    healthbar_enemy2 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy2.width = enemy2.health
    healthbar_enemy2.scale.setTo(0.05)
    healthbar_enemy2.anchor.setTo(0.5, 1)
}

const enemy2_phys = function() {
    Game.physics.arcade.enable(enemy2)
    enemy2.body.gravity.y = 500
    enemy2.body.collideWorldBounds = true
    enemy2.body.setSize(90, 162, 60)
}

const enemy2_movment = function () {
    healthbar_enemy2.width = enemy2.health

    healthbar_enemy2.x = enemy2.x+6
    healthbar_enemy2.y = enemy2.y-5
}

const enemy2_shot = function() {
    if (enemy2.visible === true){
        shooting2()
    }
}

const enemy2_dying = function() {
    if (enemy2.health < 0){
        healthbar_enemy2.kill()
        enemy2.kill()
    }
}

const enemy2_damage = function() {
    if (pl.visible && enemy2.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy2.body)){
            pl.health -= 1
        }}
        
}

const enemy2_hit = function() {
    if (pl.visible && enemy2.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy2.body)){
            enemy2.health -= 5
            pl.health += 5.5
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy2.body)){
            enemy2.health -= 5
            pl.health += 5.5
        }
    }    
}

const enemy2_collision = function() {
    Game.physics.arcade.collide(enemy2, platform1)
    Game.physics.arcade.collide(enemy2, platform2)
    Game.physics.arcade.collide(enemy2, platform3)
    Game.physics.arcade.collide(enemy2, platform4)
    Game.physics.arcade.collide(enemy2, platform5)
}

const enemy2_revive = function() {
    healthbar_enemy2.revive()
    enemy2.revive()
    enemy2.health = 50
}