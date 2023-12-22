//webpack.config.js

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');  // html 插件
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const path = require('path');
const config = require('./public/config')[process.env.NODE_ENV];

module.exports = (env, argv) => {
  console.log(env,'11111', argv,process.env.NODE_ENV)
  const isProduction = argv.mode === 'production';
  return {
    // mode: 'development',
    mode: process.env.NODE_ENV || 'development',
    entry: './src/index.js', //webpack的默认配置
    output: {
      path: path.resolve(__dirname, 'docs'), //必须是绝对路径
      filename: 'bundle.[hash].js',
      publicPath: config.publicPath,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          // 配置项...
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          use: {
            loader: 'babel-loader',
          },
          exclude: /node_modules/
        },
        {
          test: /\.(le|c)ss$/,
          use: ['style-loader', 'css-loader',
            'less-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10240, //10K
                esModule: false,
                name: '[name]_[hash:6].[ext]'
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    // Plugins 用于执行各种构建任务，从而实现一些额外的功能。它们可以用于优化、压缩、携带环境变量等各种用途。
    // Plugins 可以监听 webpack 构建过程中的生命周期事件，执行特定的任务。
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
      }),
      //不需要传参数喔，它可以找到 outputPath
      new CleanWebpackPlugin(), // 每次打包 清楚dist
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html', //打包后的文件名
        config: config.template,
        minify: {
          removeAttributeQuotes: false, //是否删除属性的双引号
          collapseWhitespace: false, //是否折叠空白
        },
        // hash: true //是否加上hash，默认是 false
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: '404.html', //打包后的文件名
        config: config.template,
        minify: {
          removeAttributeQuotes: false, //是否删除属性的双引号
          collapseWhitespace: false, //是否折叠空白
        },
        // hash: true //是否加上hash，默认是 false
      })
    ],
    devServer: {
      port: '3000', //默认是8080
      static: {
        directory: path.resolve(__dirname, 'public'), // 设置静态文件服务的根目录
      },
      historyApiFallback: true,
    },
    // 常用 的plugins
    // HtmlWebpackPlugin： 自动生成 HTML 文件，并将打包后的脚本文件自动注入到 HTML 文件中。
    // MiniCssExtractPlugin： 用于将 CSS 提取到单独的文件中，而不是将其嵌入到 JavaScript 中。
    // CleanWebpackPlugin： 在每次构建前清理输出目录，防止旧文件残留。
    // DefinePlugin： 定义全局变量，可用于设置环境变量。
    // CopyWebpackPlugin： 用于复制文件或目录到构建目录。

  }
}