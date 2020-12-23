"use strict";

var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");

var ESLintPlugin = require("eslint-webpack-plugin");

var webpack = require("webpack");

var PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
  module: {
    rules: [//   {
    //     test: /\.filename$/,
    //     use: ["loader-b", "loader-a"]
    //   },
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }, {
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    }, {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: "asset/resource"
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader",
      options: {// eslint options (if necessary)
      }
    }]
  },
  plugins: [new PrettierPlugin(), new ESLintPlugin(), new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src", "index.html")
  }), new webpack.HotModuleReplacementPlugin()],
  entry: {
    index: path.resolve(__dirname, "src", "index.js")
  },
  output: {
    path: path.resolve(__dirname, "build")
  }
};