const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//压缩图片
const ImageminPlugin = require('imagemin-webpack-plugin').default;
module.exports = {
    entry: "./src/app.js",
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          // 打包后文件名称，会自动放到 output 指定的 dist 目录
          filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
          filename: "style.css"
        }),
        new CopyWebpackPlugin([
          {
            from: './static',
            to: './static'
          }
    
        ]),
        new ImageminPlugin({
          disable: false,
          pngquant: {
              quality: '60'
          }
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          // use: ExtractTextPlugin.extract({ use: ['css-loader'] })
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false
              }
            }
          ]
        }
      ]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../youngboo.github.io/game")
    },
    mode: "production"
};
