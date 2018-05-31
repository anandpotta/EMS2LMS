const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


let pathsToClean = [
  'static/*.js',
  'static/index.html',
  'build'
];

module.exports = {
  entry: {
    app: './client/index.jsx',
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router-dom',
      'classnames'
    ],
  },
  output: {
    path: path.resolve(__dirname, "static"),
    chunkFilename: '[name].bundle.js',
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].js.map',
    pathinfo: true
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new HtmlWebpackPlugin({  // Also generate a test.html
      template: 'index.html',
      inject: 'body'
    })
  ]
};
