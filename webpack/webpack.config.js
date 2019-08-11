const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    // contentBase: './'//webpack-dev-server默认服务于根路径下的index.html，如果要更改，请修改contentBase配置
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',//url-loader是file-loader的语法糖，url-loader依赖file-loader
            options: {
              limit: 8192 //文件大小（单位 byte）低于指定的限制（8KB）时，可以返回一个 DataURL。
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        removeAttributeQuotes: true,//去除属性的引号
        removeComments: true,//去除注释
        removeEmptyAttributes: true,//去除空属性
        //...
      }
    }),
    new CleanWebpackPlugin()
  ]
}