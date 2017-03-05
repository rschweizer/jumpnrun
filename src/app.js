import 'pixi.js'
import 'p2'
import 'phaser'

import GameController from './js/GameController.js'

let App = App || {}
App = (() => {
  const c = new GameController('jnr-game', 960, 540)
  c.init()
})()
