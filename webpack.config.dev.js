const path = require("path");

module.exports = (env, ...d) => {
  console.log(env);
  console.log(d);

  return {
    entry: "./examples/**/*.demo.(tsx|ts|js)?",
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      library: {
        name: "webpack-libraries",
        type: "umd",
      },
    },
    devtools: "source-map",
    module: {
      rules: [
        { test: /\.(ts|tsx)$/i, use: "ts-loader", exclude: /node_modules/i },
      ],
      rules: [
        {
          test: /\.css/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
  };
};
