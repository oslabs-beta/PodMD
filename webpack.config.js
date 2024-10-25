const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  watchOptions: {
    poll: 1000
  },
  entry: './main.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.resolve(__dirname, "build")
  },
  devtool: 'eval-source-map',
  mode: 'development',
  devServer: {
    compress: false,
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'build'),
      publicPath: '/'
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: [
      {
        context: ['/**'],
        target: 'http://localhost:3333',
        changeOrigin: true,
        secure: false,
      }
    ]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              targets: 'defaults',
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        ]
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './client/assets/logoDesignFavicon.png'
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}