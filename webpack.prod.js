const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


module.exports = merge(common, {
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js",
    }),
    // compile time plugins
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.bundle.js']
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
            plugins: [require('babel-plugin-transform-object-rest-spread'), ["import", {
              libraryName: "antd",
              style: "css"
            }]]
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {}
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "client"), "node_modules"]
  }
});
