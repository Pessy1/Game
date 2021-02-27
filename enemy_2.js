const enemy_2_create = function() {
    enemy_2 = Game.add.sprite(100,100,'Hound')
    enemy_2.health = 70
    enemy_2.scale.setTo(1.7)
}

const enemy_2_phys = function() {
    Game.physics.arcade.enable(enemy_2)
    enemy_2.body.gravity.y = 500
    enemy_2.body.collideWorldBounds = true
    enemy_2.body.setSize(48, 28, 10, 4)
    
}

const enemy_2_movement = function() {
    console.log(enemy_2.x + enemy_2.width)
    console.log(platform1.x + platform1.width)

    if (enemy_2.x === platform1.x){
        enemy_2.body.velocity.x = 300
        enemy_2.animations.add('right',[5,6,7,8,9],10,true).play()
    }else if (enemy_2.x + enemy_2.width-3.9 === platform1.x + platform1.width){
        enemy_2.body.velocity.x = -300
        enemy_2.animations.add('left',[0,1,2,3,4],10,true).play()
    }
}