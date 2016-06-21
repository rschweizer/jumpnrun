!function(e){function t(a){if(o[a])return o[a].exports;var n=o[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}(function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))switch(typeof e[t]){case"function":break;case"object":e[t]=function(t){var o=t.slice(1),a=e[t[0]];return function(e,t,n){a.apply(this,[e,t,n].concat(o))}}(e[t]);break;default:e[t]=e[e[t]]}return e}(function(e){for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t))switch(typeof e[t]){case"function":break;case"object":e[t]=function(t){var o=t.slice(1),a=e[t[0]];return function(e,t,n){a.apply(this,[e,t,n].concat(o))}}(e[t]);break;default:e[t]=e[e[t]]}return e}([function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}o(1),o(5);var n=o(7),i=a(n),r=r||{};r=function(){var e=new i["default"]("jnr-game",960,540);e.init()}()},function(e,t){},,,,1,,function(e,t,o){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=o(8),i=a(n),r=o(9),c=a(r),d=o(10),s=a(d),l=l||{};l.GameController=function(e,t,o){function a(){n.state.add("Boot",i["default"]),n.state.add("Preloader",c["default"]),n.state.add("Game",s["default"]),n.state.start("Boot")}var n=new Phaser.Game(t,o,Phaser.AUTO,e);return n.init=a,n},t["default"]=l.GameController},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=o||{};o.Boot=function(e){function t(){e.stage.backgroundColor="#DAF0F3",e.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,e.scale.pageAlignHorizontally=!0,e.scale.pageAlignVertically=!0,e.physics.startSystem(Phaser.Physics.ARCADE)}function o(){n.load.image("preloadBar","res/img/preloader.png")}function a(){n.state.start("Preloader")}var n={};return n.init=t,n.preload=o,n.create=a,n},t["default"]=o.Boot},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=o||{};o.Preloader=function(){function e(){a=this.add.sprite(this.game.world.centerX,this.game.world.centerY,"preloadBar"),a.anchor.setTo(.5),a.scale.setTo(3),o.load.setPreloadSprite(a),o.load.tilemap("level1","res/map/level1.json",null,Phaser.Tilemap.TILED_JSON),o.load.image("tiles","res/img/tiles.png"),o.load.image("spikes","res/img/spikes.png"),o.load.image("coin","res/img/coin.png"),o.load.spritesheet("player","res/img/player.png",66,90,14,3,2)}function t(){o.state.start("Game")}var o={},a=void 0;return o.preload=e,o.create=t,o},t["default"]=o.Preloader},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=o||{};o.Game=function(e){function t(){e.time.advancedTiming=!0}function o(){h=e.add.tilemap("level1"),h.addTilesetImage("tiles","tiles"),h.createLayer("bgLayer"),h.createLayer("fgLayer"),m=h.createLayer("groundLayer"),w=h.createLayer("waterLayer"),h.setCollisionBetween(1,1e4,!0,"groundLayer"),h.setCollisionBetween(1,1e4,!0,"waterLayer"),m.resizeWorld(),c(),d(),k={},k.space=e.input.keyboard.addKey(32),k.esc=e.input.keyboard.addKey(27),k.esc.onDown.add(g,b),O=0,j=e.add.text(e.width-60,100,O,{fontSize:"80px",fill:"#40E8AC",align:"right"}),j.anchor.set(1,.5),j.rotation=.15,D=e.add.tween(j.scale).to({x:1.2,y:1.2},80,"Sine.easeIn"),D.chain(e.add.tween(j.scale).to({x:1,y:1},160,"Sine.easeOut")),_=e.add.sprite(60,e.world.height-250,"player"),e.physics.arcade.enable(_),_.body.gravity.y=1800,_.animations.add("run",[1,3,5,7,9],10,!0),_.body.velocity.x=450,_.isRunning=!0,e.camera.follow(_)}function a(){e.physics.arcade.collide(_,m,s,function(){return!_.isDead},b),e.physics.arcade.collide(_,w,l,function(){return!_.isDrowning},b),e.physics.arcade.overlap(_,x,u,function(){return!_.isDead},b),e.physics.arcade.overlap(_,P,y,function(){return!_.isDead},b),L=_.body.velocity.x,j.x=e.camera.view.x+e.width-60,j.text=O,_.body.y+_.body.height>=e.world.height-h.tileHeight&&l(),_.isRunning?(_.body.blocked.down&&_.animations.play("run"),k.space.isDown&&f(),_.x>=e.world.width-60&&(_.isRunning=!1,_.frame=0,e.time.events.add(1500,v,b))):(_.body.velocity.x-=.025*_.body.velocity.x,_.isDrowning&&(_.body.velocity.y-=.033*_.body.velocity.y))}function n(){e.debug.text((e.time.fps||"--")+" fps",20,40,"#40E8AC","20px Courier")}function i(e,t,o){return t.objects[o].filter(function(t){return t.properties.type===e})}function r(e,t){var o=t.create(e.x,e.y-h.tileHeight/2,e.properties.sprite);Object.keys(e.properties).forEach(function(t){o[t]=e.properties[t]})}function c(){x=e.add.group(),x.enableBody=!0,i("spikes",h,"obstacles").forEach(function(e){r(e,x)},b)}function d(){P=e.add.group(),P.enableBody=!0,i("coin",h,"collectibles").forEach(function(e){r(e,P)},b)}function s(){_.body.blocked.right&&(_.body.velocity.x=L*-.666,_.body.bounce.y=.5,p())}function l(){_.isDrowning=!0,_.body.velocity.x=.333*L,_.body.velocity.y=300,_.body.gravity.y=150,p()}function u(){_.isDead=!0,_.body.velocity.x=.25*L,_.body.velocity.y=-450,p()}function y(e,t){t.kill(),O+=10,D.start()}function f(){_.body.blocked.down&&(_.body.velocity.y-=700,_.animations.stop(),_.frame=11)}function p(){_.isRunning=!1,_.animations.stop(),_.frame=13,e.time.events.add(2e3,v,b)}function v(){e.state.start("Game")}function g(){e.paused=!e.paused}var b={},h=void 0,m=void 0,w=void 0,x=void 0,P=void 0,k=void 0,_=void 0,L=void 0,O=void 0,j=void 0,D=void 0;return b.preload=t,b.create=o,b.update=a,b.render=n,b},t["default"]=o.Game}])));