const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

  mode: 'development',

  entry: {
    'app': helpers.root('src', 'index.tsx'),
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    modules: [
      helpers.root('src'),
      helpers.root('node_modules')
    ],
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be forced rule by 'tslint-loader'.
      // define in tslint.json
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          emitErrors: true,
        },
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre", test: /\.js$/, loader: "source-map-loader"
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]',
      },
      {
        test: /\.(scss|css)$/,
        resolve: {
          extensions: [".scss", ".css"],
        },
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          'sass-loader?sourceMap',
        ]
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Apps',
      name: 'index.html',
      template: 'src/index.html',
    }),

    new MiniCssExtractPlugin(),
  ],

  devServer: {
    historyApiFallback: true,
    open: true,
    stats: {
      env: true,
      chunks: false,
      modules: false,
      warnings: false,
      children: false,
    },
    overlay: {
      warnings: false,
      errors: true
    }
  }
};
