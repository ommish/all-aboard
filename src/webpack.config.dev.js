const webpack = require('webpack');
const path = require('path');

module.exports =  {
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, 'app', 'entry.jsx')
  ],
  output: {
    path: path.resolve(__dirname),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
