const platform1_create = function(x, y) {
    plat1 = platform1.create(x, y, "plat1")
    plat1.scale.setTo(8)
    Game.physics.arcade.enable(plat1)
    plat1.body.allowGravity = false
    plat1.body.collideWorldBounds = true
    plat1.body.immovable = true
}
const platform2_create = function(x, y) {
    plat2 = platform2.create(x, y, "plat2")
    plat2.scale.setTo(3)
    Game.physics.arcade.enable(plat2)
    plat2.body.allowGravity = false
    plat2.body.collideWorldBounds = true
    plat2.body.immovable = true
}
const platform3_create = function(x, y) {
    plat3 = platform1.create(x, y, "plat3")
    plat3.scale.setTo(3)
    Game.physics.arcade.enable(plat3)
    plat3.body.allowGravity = false
    plat3.body.collideWorldBounds = true
    plat3.body.immovable = true
}
const platform4_create = function(x, y) {
    plat4 = platform4.create(x, y, "plat4")
    plat4.scale.setTo(3)
    Game.physics.arcade.enable(plat4)
    plat4.body.allowGravity = false
    plat4.body.collideWorldBounds = true
    plat4.body.immovable = true
}
const platform5_create = function(x, y) {
    plat5 = platform5.create(x, y, "plat5")
    plat5.scale.setTo(5)
    Game.physics.arcade.enable(plat5)
    plat5.body.allowGravity = false
    plat5.body.collideWorldBounds = true
    plat5.body.immovable = true
}