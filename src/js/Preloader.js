let App = App || {}
App.Preloader = () => {
  'use strict'
  /* eslint-env browser */
  /* global Phaser */

  const self = {}

  let preloadBar

  function preload() {
    preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadBar')
    preloadBar.anchor.setTo(0.5)
    preloadBar.scale.setTo(3)

    self.load.setPreloadSprite(preloadBar)
    self.load.tilemap('level1', 'res/map/level1.json', null, Phaser.Tilemap.TILED_JSON)
    self.load.image('tiles', 'res/img/tiles.png')
    self.load.image('spikes', 'res/img/spikes.png')
    self.load.image('bronzeCoin', 'res/img/coin-bronze.png')
    self.load.image('silverCoin', 'res/img/coin-silver.png')
    self.load.image('goldCoin', 'res/img/coin-gold.png')
    self.load.spritesheet('player', 'res/img/player.png', 66, 90, 14, 3, 2)
  }

  function create() {
    self.state.start('Game')
  }

  self.preload = preload
  self.create = create
  return self
}

export default App.Preloader
