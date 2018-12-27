const path = require('path')
const srcPath = path.join(__dirname, 'public', 'javascripts', 'src')

const Dotenv = require('dotenv-webpack')
require('dotenv').config()

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    main: path.join(srcPath, 'main.jsx'),
    matchlist: path.join(srcPath, 'matchlist.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'public', 'javascripts', 'lib'),
    filename: '[name].js'
  },
  plugins: [
    new Dotenv()
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)/,
      loader: 'babel-loader',
      query: {
        presets: ['@babel/preset-react', '@babel/preset-env']
      }
    }]
  }
}
