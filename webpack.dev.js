const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './docs',
    publicPath: '/release/',
  },
  entry: './docs/js/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'docs/release'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.svg$|\.eot$|\.woff$|\.woff2$|\.ttf$/,
        loader: 'file-loader',
        options: {
          publicPath: 'release',
        },
      },
    ],
  },
}
