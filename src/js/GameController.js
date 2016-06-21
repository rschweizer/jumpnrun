import Boot from './Boot.js'
import Preloader from './Preloader.js'
import Game from './Game.js'

let App = App || {}
App.GameController = (container, width, height) => {
  'use strict'
  /* eslint-env browser */
  /* global Phaser */

  const self = new Phaser.Game(width, height, Phaser.AUTO, container)

  function init() {
    self.state.add('Boot', Boot)
    self.state.add('Preloader', Preloader)
    self.state.add('Game', Game)
    self.state.start('Boot')
  }

  self.init = init
  return self
}

export default App.GameController
