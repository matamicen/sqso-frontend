const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const isInProduction = process.env.NODE_ENV === 'production';
module.exports = {
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.(pdf|ico|jpg|eot|otf|woff2|woff|ttf|mp4|webm)$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          query: { name: "[name].[ext]" }
        }
      },
      {
        test: /\.js$/,
        exclude: /node-modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  }
};
