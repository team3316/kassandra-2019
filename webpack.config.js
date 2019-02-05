const path = require('path')
const srcPath = path.join(__dirname, 'src')

const Dotenv = require('dotenv-webpack')
require('dotenv').config()

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    app: path.join(srcPath, 'app.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  plugins: [
    new Dotenv()
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['@babel/preset-env', '@babel/preset-react']
      }
    }, {
      test: /\.scss/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  resolve: {
    alias: {
      components: `${srcPath}/components`,
      reducers: `${srcPath}/reducers`,
      containers: `${srcPath}/containers`,
      actions: `${srcPath}/actions`,
      style: `${srcPath}/style`
    }
  }
}
