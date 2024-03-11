const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("fast-glob");

const getFileName = (path) => glob.sync(path);
const controllers = getFileName("./src/assets/js/*.js").reduce(
  (acc, currentPath) => {
    const fileName = currentPath.split("/").pop().replace(".js", "");
    acc[fileName] = currentPath;

    return acc;
  },
  {}
);

module.exports = {
  mode: "development",
  entry: { ...controllers },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: `assets/js/[name].js`,
    chunkFilename: `assets/js/[name].js`,
    publicPath: "/",
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    open: ["/"],
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      }
    ],
  },
  plugins: [
    new CopyPlugin({
        patterns: [
          {
            from: "./src/assets/fonts",
            to: "./assets/fonts",
            noErrorOnMissing: true,
          },
          {
            from: "./src/assets/images",
            to: "./assets/images",
            noErrorOnMissing: true,
          },
        ],
      }),
    new MiniCssExtractPlugin({
        filename: "assets/css/[name].css",
        chunkFilename: "[id].css",
    }),
  ],
};
