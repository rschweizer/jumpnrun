let App = App || {}
App.Boot = (game) => {
  'use strict'
  /* eslint-env browser */
  /* global Phaser */

  const self = {}

  function init() {
    game.stage.backgroundColor = '#DAF0F3'
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true
    game.physics.startSystem(Phaser.Physics.ARCADE)
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
