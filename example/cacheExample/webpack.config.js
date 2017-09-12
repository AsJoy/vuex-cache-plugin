/**
 * Created by yuanqiangniu on 2017/9/12.
 */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: {
    'index': ['webpack-hot-middleware/client', './src/index.js'],
  },

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      { test: /\.js$/, include: path.resolve(__dirname, '../../'),loader: 'babel-loader' },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

}
