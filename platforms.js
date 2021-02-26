const platforms_create = function(x, y) {
    platform1 = platforms.create(x, y, "plat1")
    platform1.scale.setTo(5)
    Game.physics.arcade.enable(platform1)
    platform1.body.allowGravity = false
    platform1.body.immovable = true
}