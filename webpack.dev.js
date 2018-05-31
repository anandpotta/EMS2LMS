const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');



module.exports = merge(common, {
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js",
      // (with more entries, this ensures that no other module goes into the vendor chunk)
    }),
    // compile time plugins
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.bundle.js']
    }),
    // webpack-dev-server enhancement plugins
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015'],
            plugins: [
              require('babel-plugin-transform-object-rest-spread'), ["import", {
                libraryName: "antd",
                style: "css"
              }]
            ]
          }
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
  },
  devServer: {
    hot: true,
    inline: true,
    port: 8000,
    contentBase: path.join(__dirname, '/static/'),
    proxy: {
      '/api': 'http://localhost:8080'
    },
    historyApiFallback: true,
    watchOptions: {
      poll: true
    }
  },
  devtool: 'cheap-module-eval-source-map'
});
