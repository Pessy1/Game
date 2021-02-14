const arrow_create = function() {
    arrow = Game.add.group()
    arrow.enableBody = true
    arrow.physicsBodyType = Phaser.Physics.ARCADE

    arrow.createMultiple(50, 'arrow')
    arrow.setAll('checkWorldBounds', true)
    arrow.setAll('outOfBoundsKill', true)
} 