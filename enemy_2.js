const enemy_2_create = function() {
    enemy_2 = Game.add.sprite(800, 2300,'Hound')
    enemy_2.health = 70
    enemy_2.scale.setTo(1.7)
}

const enemy_2_phys = function() {
    Game.physics.arcade.enable(enemy_2)
    enemy_2.body.gravity.y = 500
    enemy_2.body.collideWorldBounds = true
    enemy_2.body.setSize(48, 28, 10, 4)
    enemy_2.body.velocity.x = -300
    
}

const enemy_2_movement = function() {
    if (enemy_2.x === plat_hound.x){
        enemy_2.body.velocity.x = 300
        enemy_2.animations.add('right',[5,6,7,8,9],10,true).play()
    }else if (enemy_2.x + enemy_2.width - 3.9 === plat_hound.x + plat_hound.width){
        enemy_2.body.velocity.x = -300
        enemy_2.animations.add('left',[0,1,2,3,4],10,true).play()
    }
}

const enemy_2_dying = function() {
    if (enemy_2.health < 0){
        enemy_2.kill()
    }
}

const enemy_2_damage = function() {
    if (pl.visible && enemy_2.visible){
        if (Phaser.Rectangle.intersects(pl.body, enemy_2.body)){
            pl.health -= 1
        }}
}

const enemy_2_hit = function() {
    if (pl.visible && enemy_2.visible){
        if (Phaser.Rectangle.intersects(attacker.body, enemy_2.body)){
            enemy_2.health -= 5
            pl.health += 7
        }
        if (Phaser.Rectangle.intersects(attacker1.body, enemy_2.body)){
            enemy_2.health -= 5
            pl.health += 7
        }
    }
}

const enemy_2_collision = function() {
    Game.physics.arcade.collide(enemy_2, platform5)
    Game.physics.arcade.collide(enemy_2, plat_hound)
    Game.physics.arcade.collide(enemy_2, plat_hound2)
    Game.physics.arcade.collide(enemy_2, plat_hound3)
}

const enemy_2_revive = function() {
    enemy_2.revive()
    enemy_2.x = 1100
    enemy_2.y = 2900
    enemy_2.health = 50
}