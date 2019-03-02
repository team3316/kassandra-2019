const path = require('path')
const srcPath = path.join(__dirname, 'src')
require('dotenv').config()

const { EnvironmentPlugin } = require('webpack')

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
    new EnvironmentPlugin({
      'NODE_ENV': 'development',
      'DISTRICT_KEY': 'non',
      'CURRENT_EVENT': '2019isde2',
      'TBA_AUTH': ''
    })
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
    }, {
      test: /\.svg/,
      use: 'svg-inline-loader'
    }]
  },
  resolve: {
    alias: {
      components: `${srcPath}/components/index.js`,
      reducers: `${srcPath}/reducers`,
      containers: `${srcPath}/containers`,
      actions: `${srcPath}/actions`,
      views: `${srcPath}/views/index.js`,
      style: `${srcPath}/style`
    }
  }
}
