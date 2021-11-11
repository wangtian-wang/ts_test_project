const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  /** 配置多入口打包时候需要开启 */
  //   optimization: {
  //     runtimeChunk: "single",
  //   },
  mode: "development",
  entry: "./src/main.ts",
  /** 官网上的多入口打包热更新设置 */
  //   entry: {
  //     main: "./src/main.ts",
  //     client: "webpack-dev-server/client/index.js?hot=true&live-reload=true",
  //     hot: "webpack/hot/dev-server.js",
  //   },
  devtool: "eval-cheap-module-source-map", // 页面的错误文件提示
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".cjs", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
