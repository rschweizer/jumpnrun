import './css/normalize.css'
import './css/app.css'

import GameController from './js/GameController.js'

let App = App || {}
App = (() => {
  const controller = new GameController('jnr-game', 960, 540)
  controller.init()
})()
