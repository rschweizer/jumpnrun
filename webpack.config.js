var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')

var phaserModule = path.join(__dirname, '/node_modules/phaser/'),
    phaser = path.join(phaserModule, 'build/custom/phaser-arcade-physics.js'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
  cache: false,
  context: __dirname + "/src",
  entry: "./app.js",
  output: {
    path: __dirname + "/dist/res/js",
    filename: "script.js"
  },
  module: {
    loaders: [
      {
        test: /phaser-arcade-physics.js/,
        loader: "script"
      },
      {
        test: /pixi.js/,
        loader: "script"
      },
      {
        test: /p2.js/,
        loader: "script"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ["es2015"]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css!postcss")
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=../fonts/[hash].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi.js': pixi,
      'p2': p2
    }
  },
  postcss: [
    require("postcss-cssnext")()
  ],
  // devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin("../css/style.css"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
}
