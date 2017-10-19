const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  devtool: 'inline-source-map',
  watch: true,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/public/dist')
  },
  module: {
    rule: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['env', 'react', 'stage-3'] },
        }],
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom';
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: false,
    port: 3000
  }
};
