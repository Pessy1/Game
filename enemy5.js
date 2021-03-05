const enemy5_create = function() {
    enemy5 = Game.add.sprite(4800, 3200,'Archerer')
    enemy5.scale.setTo(0.6)
    enemy5.anchor.setTo(0.5, 0)
    enemy5.health = 50
    enemy5.frame = 13

    healthbar_enemy5 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy5.width = enemy5.health
    healthbar_enemy5.scale.setTo(0.05)
    healthbar_enemy5.anchor.setTo(0.5, 1)
}

const enemy5_phys = function() {
    Game.physics.arcade.enable(enemy5)
    enemy5.body.gravity.y = 500
    enemy5.body.collideWorldBounds = true
    enemy5.body.setSize(90, 162, 60)
}

const enemy5_movment = function () {
    healthbar_enemy5.width = enemy5.health

    healthbar_enemy5.x = enemy5.x+6
    healthbar_enemy5.y = enemy5.y-5
}

const enemy5_shot = function() {
    if (enemy5.visible === true){
        shooting5()
    }
}

const enemy5_dying = function() {
    if (enemy5.health < 0){
        healthbar_enemy5.kill()
        enemy5.kill()
    }
}

const enemy5_damage = function() {
    if (pl.visible && enemy5.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy5.body)){
            pl.health -= 1
        }}
        
}

const enemy5_hit = function() {
    if (pl.visible && enemy5.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy5.body)){
            enemy5.health -= 5
            pl.health += 5.5
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy5.body)){
            enemy5.health -= 5
            pl.health += 5.5
        }
    }    
}

const enemy5_collision = function() {
    Game.physics.arcade.collide(enemy5, platform1)
    Game.physics.arcade.collide(enemy5, platform2)
    Game.physics.arcade.collide(enemy5, platform3)
    Game.physics.arcade.collide(enemy5, platform4)
    Game.physics.arcade.collide(enemy5, platform5)
}

const enemy5_revive = function() {
    healthbar_enemy5.revive()
    enemy5.revive()
    enemy5.health = 50
}