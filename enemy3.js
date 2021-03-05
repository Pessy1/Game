const enemy3_create = function() {
    enemy3 = Game.add.sprite(1900, 3050,'Archerer')
    enemy3.scale.setTo(-0.6, 0.6)
    enemy3.anchor.setTo(0.5, 0)
    enemy3.health = 50
    enemy3.frame = 13

    healthbar_enemy3 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy3.width = enemy3.health
    healthbar_enemy3.scale.setTo(0.05)
    healthbar_enemy3.anchor.setTo(0.5, 1)
}

const enemy3_phys = function() {
    Game.physics.arcade.enable(enemy3)
    enemy3.body.gravity.y = 500
    enemy3.body.collideWorldBounds = true
    enemy3.body.setSize(90, 162, 60)
}

const enemy3_movment = function () {
    healthbar_enemy3.width = enemy3.health

    healthbar_enemy3.x = enemy3.x+6
    healthbar_enemy3.y = enemy3.y-5
}

const enemy3_shot = function() {
    if (enemy3.visible === true){
        shooting3()
    }
}

const enemy3_dying = function() {
    if (enemy3.health < 0){
        healthbar_enemy3.kill()
        enemy3.kill()
    }
}

const enemy3_damage = function() {
    if (pl.visible && enemy3.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy3.body)){
            pl.health -= 1
        }}
        
}

const enemy3_hit = function() {
    if (pl.visible && enemy3.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy3.body)){
            enemy3.health -= 5
            pl.health += 5.5
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy3.body)){
            enemy3.health -= 5
            pl.health += 5.5
        }
    }    
}

const enemy3_collision = function() {
    Game.physics.arcade.collide(enemy3, platform1)
    Game.physics.arcade.collide(enemy3, platform2)
    Game.physics.arcade.collide(enemy3, platform3)
    Game.physics.arcade.collide(enemy3, platform4)
    Game.physics.arcade.collide(enemy3, platform5)
}

const enemy3_revive = function() {
    healthbar_enemy3.revive()
    enemy3.revive()
    enemy3.health = 50
}