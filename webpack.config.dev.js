const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

const entry = {};
const templateParameters = [];
const _entry = glob.sync("./examples/**demo.?(ts|tsx|js|jsx)");
_entry.forEach((e, i) => {
  const _path = path.resolve(__dirname, e);
  const pathArr = _path.split("\\");
  const fileName = pathArr[pathArr.length - 1];
  const key = String(i);
  const name = fileName.replace(/\.demo\.(jsx?|tsx?)$/, "");
  entry[name] = _path;
  templateParameters.push({
    key,
    path: _path,
    fileName: fileName,
    name,
  });
});

module.exports = {
  mode: "development",
  entry: entry,
  devServer: {
    open: false,
    hot: true,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
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
  plugins: [
    ...templateParameters.map((t) => {
      return new HtmlWebpackPlugin({
        filename: t.name + ".html",
        chunks: [t.name],
      });
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: "./public/index.html",
      templateParameters: templateParameters,
    }),
  ],
};
