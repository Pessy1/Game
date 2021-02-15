const arrow_create = function() {
    arrow = Game.add.sprite(enemy.x, enemy.y+32, 'arrow')
    arrow.scale.setTo(-1)
    Game.physics.arcade.enable(arrow)
} 