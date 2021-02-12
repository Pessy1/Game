const enemy_create = function() {
    enemy = Game.add.sprite(Game.width-200,0,'blue')
    enemy.scale.setTo(0.5)
    enemy.health = 50
}

const enemy_phys = function() {
    Game.physics.arcade.enable(enemy)
    enemy.body.gravity.y = 500
    enemy.body.collideWorldBounds = true
}