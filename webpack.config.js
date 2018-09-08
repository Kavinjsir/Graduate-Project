const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  lib: path.resolve(__dirname, 'lib'),
};

const common = {
  target: 'web',
  entry: `${PATHS.src}/index.tsx`,
  
  output: {
    // publicPath: '/lib/',
    path: PATHS.lib,
    filename: '[name].[chunkhash].js',
  },
  
  resolve: {
    alias: {
      '@src': PATHS.src,
    },
    extensions: ['.ts', '.tsx', '.jsx', '.js', '*'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
        exclude: /node_modules/,
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([PATHS.lib], {
      root: process.cwd()
    }),
    new HTMLWebpackPlugin({
      title: 'Light Mail',
      filename: 'index.html',
    }),
    new webpack.HashedModuleIdsPlugin()
  ],
  
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // }
};

const dev = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '[name].bundle.js',
  },
})

module.exports = dev;
