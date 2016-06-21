let App = App || {}
App.Game = (game) => {
  'use strict'
  /* eslint-env browser */

  const self = {}

  let map,
      ground,
      water,
      obstacles,
      collectibles,
      controls,
      player,
      speed,
      score,
      scoreboard,
      pulse

  function preload() {
    game.time.advancedTiming = true
  }

  function create() {
    map = game.add.tilemap('level1')
    map.addTilesetImage('tiles', 'tiles')
    map.createLayer('bgLayer')
    map.createLayer('fgLayer')
    ground = map.createLayer('groundLayer')
    water = map.createLayer('waterLayer')

    map.setCollisionBetween(1, 10000, true, 'groundLayer')
    map.setCollisionBetween(1, 10000, true, 'waterLayer')

    ground.resizeWorld()

    createObstacles()
    createCollectibles()

    controls = {}
    controls.space = game.input.keyboard.addKey(32)
    controls.esc = game.input.keyboard.addKey(27)
    controls.esc.onDown.add(togglePlayPause, self)

    score = 0
    scoreboard = game.add.text(game.width - 60, 100, score, { fontSize: '80px', fill: '#40E8AC', align: 'right'})
    scoreboard.anchor.set(1, 0.5)
    scoreboard.rotation = 0.15
    pulse = game.add.tween(scoreboard.scale).to({ x: 1.2, y: 1.2}, 80, 'Sine.easeIn')
    pulse.chain(game.add.tween(scoreboard.scale).to({ x: 1, y: 1}, 160, 'Sine.easeOut'))

    player = game.add.sprite(60, game.world.height - 250, 'player')
    game.physics.arcade.enable(player)
    player.body.gravity.y = 1800
    player.animations.add('run', [1, 3, 5, 7, 9], 10, true)
    player.body.velocity.x = 450
    player.isRunning = true
    game.camera.follow(player)
  }

  function update() {
    game.physics.arcade.collide(player, ground, groundHit, () => !player['isDead'], self)
    game.physics.arcade.collide(player, water, waterHit, () => !player['isDrowning'], self)
    game.physics.arcade.overlap(player, obstacles, obstacleHit, () => !player['isDead'], self)
    game.physics.arcade.overlap(player, collectibles, collectibleHit, () => !player['isDead'], self)

    speed = player.body.velocity.x
    scoreboard.x = game.camera.view.x + game.width - 60
    scoreboard.text = score

    if(player.body.y + player.body.height >= game.world.height - map.tileHeight) {
      waterHit()
    }

    if(player.isRunning) {
      if(player.body.blocked.down) {
        player.animations.play('run')
      }

      if(controls.space.isDown) {
        jump()
      }

      if(player.x >= game.world.width - 60) {
        player.isRunning = false
        player.frame = 0
        game.time.events.add(1500, restart, self)
      }
    } else {
      player.body.velocity.x -= player.body.velocity.x * 0.025
      if(player['isDrowning']) {
        player.body.velocity.y -= player.body.velocity.y * 0.033
      }
    }
  }

  function render() {
    game.debug.text((game.time.fps || '--') + ' fps', 20, 40, "#40E8AC", "20px Courier")
  }

  function findObjectsByType(type, map, layer) {
    return map.objects[layer]
      .filter((obstacle) => obstacle.properties.type === type)
  }

  function createObject(object, group) {
    const sprite = group.create(object.x, object.y - map.tileHeight / 2, object.properties.sprite)
    Object.keys(object.properties).forEach(function(key){
      sprite[key] = object.properties[key]
    })
  }

  function createObstacles() {
    obstacles = game.add.group()
    obstacles.enableBody = true
    findObjectsByType('spikes', map, 'obstacles')
      .forEach((obstacle) => {
        createObject(obstacle, obstacles)
      }, self)
  }

  function createCollectibles() {
    collectibles = game.add.group()
    collectibles.enableBody = true
    findObjectsByType('coin', map, 'collectibles')
      .forEach((collectible) => {
        createObject(collectible, collectibles)
      }, self)
  }

  function groundHit() {
    if(player.body.blocked.right) {
      player.body.velocity.x = speed * (-0.666)
      player.body.bounce.y = 0.5
      gameOver()
    }
  }

  function waterHit() {
    player.isDrowning = true
    player.body.velocity.x = speed * 0.333
    player.body.velocity.y = 300
    player.body.gravity.y = 150
    gameOver()
  }

  function obstacleHit() {
    player.isDead = true
    player.body.velocity.x = speed * 0.25
    player.body.velocity.y = -450
    gameOver()
  }

  function collectibleHit(player, collectible) {
    collectible.kill()
    score += 10
    pulse.start()
  }

  function jump() {
    if(player.body.blocked.down) {
      player.body.velocity.y -= 700
      player.animations.stop()
      player.frame = 11
    }
  }

  function gameOver() {
    player.isRunning = false
    player.animations.stop()
    player.frame = 13
    game.time.events.add(2000, restart, self)
  }

  function restart() {
    game.state.start('Game')
  }

  function togglePlayPause() {
    game.paused = !game.paused
  }

  self.preload = preload
  self.create = create
  self.update = update
  self.render = render
  return self
}

export default App.Game
