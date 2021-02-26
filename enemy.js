const enemy_create = function() {
    enemy = Game.add.sprite(Game.width-200,0,'Archerer')
    enemy.scale.setTo(0.6)
    enemy.anchor.setTo(0.5, 0)
    enemy.health = 50
}

const enemy_phys = function() {
    Game.physics.arcade.enable(enemy)
    enemy.body.gravity.y = 500
    enemy.body.collideWorldBounds = true
    enemy.body.setSize(90, 162, 60)
    console.log(enemy.body)
    console.log(enemy.body.width)
    console.log(enemy.body.height)
    console.log(enemy.width)
    
}

const archerer_movment = function () {

}