module.exports = function (api) {
  return {
    plugins: ['macros'],
    module: {
      rules: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader?cacheDirectory=true',
          }
      }]
  }
  }
}