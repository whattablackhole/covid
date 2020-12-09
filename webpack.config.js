const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
    module: {
        rules: [
        //   {
        //     test: /\.filename$/,
        //     use: ["loader-b", "loader-a"]
        //   },

          {
            test: /\.css$/,
            use: ["style-loader", "css-loader",]
          },
          {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
              // eslint options (if necessary)
            },
          },
    
        ]
      },
    plugins: [
        new ESLintPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ],
    entry: {
        index: path.resolve(__dirname, "src", "index.js")
    },
    output: {
        path: path.resolve(__dirname, "build")
    }
};