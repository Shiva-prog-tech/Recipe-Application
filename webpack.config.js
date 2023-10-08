const path = require("path");
const Htmlwebpackplugin = require("html-webpack-plugin");
module.exports = {
  entry:["babel-polyfill" ,"./src/js/index.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    //       compress: true,
    // port: 9000,
  },
  plugins: [
    new Htmlwebpackplugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: "/\.js$/",
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};