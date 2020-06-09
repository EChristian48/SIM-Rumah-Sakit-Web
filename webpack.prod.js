const path = require('path')

module.exports = {
  mode: 'production',
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
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
}
