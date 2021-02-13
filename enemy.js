const enemy_create = function() {
    enemy = Game.add.sprite(Game.width-200,0,'Archerer')
    enemy.scale.setTo(-2,2)
    enemy.health = 50
    enemy.animations.add('idle',[0,2,4,6,8,10,12,14,16,18],10,true).play()
}

const enemy_phys = function() {
    Game.physics.arcade.enable(enemy)
    enemy.body.gravity.y = 500
    enemy.body.collideWorldBounds = true
}

const archerer_movment = function () {

}