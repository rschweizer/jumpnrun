var webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin")

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
