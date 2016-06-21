let App = App || {}
App.Boot = (game) => {
  'use strict'
  /* eslint-env browser */
  /* global Phaser */

  const self = {}

  function init() {
    game.input.maxPointers = 1
    game.stage.backgroundColor = '#DAF0F3'
    game.stage.disableVisibilityChange = true
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.setMinMax(480, 260, 960, 540)
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true
    game.physics.startSystem(Phaser.Physics.ARCADE)
    if (this.game.device.desktop) {
      game.input.mouse.enabled = false
    }
  }

  function preload() {
    self.load.image('preloadBar', 'res/img/preloader.png')
  }

  function create() {
    self.state.start('Preloader')
  }

  self.init = init
  self.preload = preload
  self.create = create
  return self
}

export default App.Boot
