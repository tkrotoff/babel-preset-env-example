const path = require('path');

module.exports = {
  entry: {
    App: './App.js'
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },

  plugins: [],

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(html|css|png)$/,
        loader: 'file-loader',
        options: { name: '[path][name].[ext]' }
      }
    ]
  }
};
