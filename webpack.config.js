const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "lib"),
    library: {
      name: "webpack-libraries",
      type: "umd",
    },
    clean: true,
  },
  devtool: "inline-source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/i },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
