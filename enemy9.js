const enemy9_create = function() {
    //6112
    //4607

    enemy9 = Game.add.sprite(6112, 4507,'Archerer')
    enemy9.scale.setTo(0.6)
    enemy9.anchor.setTo(0.5, 0)
    enemy9.health = 50
    enemy9.frame = 13

    healthbar_enemy9 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy9.width = enemy9.health
    healthbar_enemy9.scale.setTo(0.05)
    healthbar_enemy9.anchor.setTo(0.5, 1)
}

const enemy9_phys = function() {
    Game.physics.arcade.enable(enemy9)
    enemy9.body.gravity.y = 500
    enemy9.body.collideWorldBounds = true
    enemy9.body.setSize(90, 162, 60)
}

const enemy9_movment = function () {
    healthbar_enemy9.width = enemy9.health

    healthbar_enemy9.x = enemy9.x+6
    healthbar_enemy9.y = enemy9.y-5
}

const enemy9_shot = function() {
    if (enemy9.visible === true){
        shooting9()
    }
}

const enemy9_dying = function() {
    if (enemy9.health < 0){
        healthbar_enemy9.kill()
        enemy9.kill()
    }
}

const enemy9_damage = function() {
    if (pl.visible && enemy9.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy9.body)){
            pl.health -= 1
        }}
        
}

const enemy9_hit = function() {
    if (pl.visible && enemy9.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy9.body)){
            enemy9.health -= 5
            pl.health += 5.5
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy9.body)){
            enemy9.health -= 5
            pl.health += 5.5
        }
    }    
}

const enemy9_collision = function() {
    Game.physics.arcade.collide(enemy9, platform1)
    Game.physics.arcade.collide(enemy9, platform2)
    Game.physics.arcade.collide(enemy9, platform3)
    Game.physics.arcade.collide(enemy9, platform4)
    Game.physics.arcade.collide(enemy9, platform5)
}

const enemy9_revive = function() {
    healthbar_enemy9.revive()
    enemy9.revive()
    enemy9.health = 50
}