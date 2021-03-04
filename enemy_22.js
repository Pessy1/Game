const enemy_22_create = function() {
    enemy_22 = Game.add.sprite(6900, 2800,'Hound')
    enemy_22.health = 70
    enemy_22.scale.setTo(1.7)
    healthbar_enemy_22 = Game.add.sprite(0,0,'healthbar')
    healthbar_enemy_22.width = enemy_22.health
    healthbar_enemy_22.scale.setTo(0.05)
    healthbar_enemy_22.anchor.setTo(0.5, 1)
}

const enemy_22_phys = function() {
    Game.physics.arcade.enable(enemy_22)
    enemy_22.body.gravity.y = 500
    enemy_22.body.collideWorldBounds = true
    enemy_22.body.setSize(48, 28, 10, 4)
    enemy_22.body.velocity.x = -300
    
}

const enemy_22_movement = function() {
    healthbar_enemy_22.width = enemy_22.health

    healthbar_enemy_22.x = enemy_22.x+enemy_22.width/2+6
    healthbar_enemy_22.y = enemy_22.y-5
    if (enemy_22.x === plat_hound3.x){
        enemy_22.body.velocity.x = 300
        enemy_22.animations.add('right',[5,6,7,8,9],10,true).play()
    }else if (enemy_22.x + enemy_22.width - 3.9 === plat_hound3.x + plat_hound3.width){
        enemy_22.body.velocity.x = -300
        enemy_22.animations.add('left',[0,1,2,3,4],10,true).play()
    }
}

const enemy_22_dying = function() {
    if (enemy_22.health < 0){
        healthbar_enemy_22.kill()
        enemy_22.kill()
    }
}

const enemy_22_damage = function() {
    if (pl.visible && enemy_22.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy_22.body)){
            pl.health -= 1
        }}
}

const enemy_22_hit = function() {
    if (pl.visible && enemy_22.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy_22.body)){
            enemy_22.health -= 5
            pl.health += 5
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy_22.body)){
            enemy_22.health -= 5
            pl.health += 5
        }
    }
}

const enemy_22_collision = function() {
    Game.physics.arcade.collide(enemy_22, platform1)
    Game.physics.arcade.collide(enemy_22, platform2)
    Game.physics.arcade.collide(enemy_22, platform3)
    Game.physics.arcade.collide(enemy_22, platform4)
    Game.physics.arcade.collide(enemy_22, platform5)
    Game.physics.arcade.collide(enemy_22, plat_hound2)
    Game.physics.arcade.collide(enemy_22, plat_hound2)
    Game.physics.arcade.collide(enemy_22, plat_hound3)
}

const enemy_22_revive = function() {
    healthbar_enemy_22.revive()
    enemy_22.revive()
    enemy_22.x = 6900
    enemy_22.y = 2800
    enemy_22.health = 50
}