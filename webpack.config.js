const path = require('path');

module.exports = {
  entry: {
    App: './App.js'
  },

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },

  plugins: [
  ],

  resolve: {
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        /* .babelrc is not required, instead you can pass options to babel-loader:
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: ['> 1% in FR']
              },
              useBuiltIns: true,
              debug: true
            }]
          ]
        }*/
      },
      { test: /\.js$/, loader: 'source-map-loader' },
      { test: /\.(html|css|png)$/, loader: 'file-loader', options: {name: '[path][name].[ext]'} }
    ]
  }
};
