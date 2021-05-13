const enemy_21_create = function() {
    enemy_21 = Game.add.sprite(5500, 2400,'Hound')
    enemy_21.health = 70
    enemy_21.scale.setTo(1.7)
}

const enemy_21_phys = function() {
    Game.physics.arcade.enable(enemy_21)
    enemy_21.body.gravity.y = 500
    enemy_21.body.collideWorldBounds = true
    enemy_21.body.setSize(48, 28, 10, 4)
    enemy_21.body.velocity.x = -300
    
}

const enemy_21_movement = function() {
    if (enemy_21.x === plat_hound2.x){
        enemy_21.body.velocity.x = 300
        enemy_21.animations.add('right',[5,6,7,8,9],10,true).play()
    }else if (enemy_21.x + enemy_21.width - 3.9 === plat_hound2.x + plat_hound2.width){
        enemy_21.body.velocity.x = -300
        enemy_21.animations.add('left',[0,1,2,3,4],10,true).play()
    }
}

const enemy_21_dying = function() {
    if (enemy_21.health < 0){
        enemy_21.kill()
    }
}

const enemy_21_damage = function() {
    if (pl.visible && enemy_21.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy_21.body)){
            pl.health -= 1
        }}
}

const enemy_21_hit = function() {
    if (pl.visible && enemy_21.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy_21.body)){
            enemy_21.health -= 5
            pl.health += 7
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy_21.body)){
            enemy_21.health -= 5
            pl.health += 7
        }
    }
}

const enemy_21_collision = function() {
    Game.physics.arcade.collide(enemy_21, platform1)
    Game.physics.arcade.collide(enemy_21, platform2)
    Game.physics.arcade.collide(enemy_21, platform3)
    Game.physics.arcade.collide(enemy_21, platform4)
    Game.physics.arcade.collide(enemy_21, platform5)
    Game.physics.arcade.collide(enemy_21, plat_hound2)
    Game.physics.arcade.collide(enemy_21, plat_hound2)
    Game.physics.arcade.collide(enemy_21, plat_hound3)
}

const enemy_21_revive = function() {
    enemy_21.revive()
    enemy_21.x = 3700
    enemy_21.y = 2200
    enemy_21.health = 50
}