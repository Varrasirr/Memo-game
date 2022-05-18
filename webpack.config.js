const path = require("path");
const open = require("open");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: "./src/script.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.svg$/,
        type: "asset/resource",
      },

      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      {
        test: /\.(png|jpe?g|gif|jp2|webp)$/,
        loader: "file-loader",
        options: {
          name: "images/[name].[ext]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      "@components": path.resolve("./src/Components"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new StylelintPlugin({
      files: "src/{**/*,*}.css",
    }),
    new ESLintPlugin({
      files: "src/{**/*,*}.{tsx,ts}",
    }),

  ],
  devServer: {
    client: {
      overlay: false,
    },
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
