const path = require('path')

module.exports = {
  entry: {
    app: './public/javascripts/src/main.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'public', 'javascripts', 'lib'),
    filename: 'main.js'
  },
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
