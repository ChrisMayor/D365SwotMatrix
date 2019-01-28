const { resolve } = require('path');
const rxPaths = require('rxjs/_esm5/path-mapping');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { IndexHtmlWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/index-html-webpack-plugin');

module.exports = {

  mode: 'development',

  devtool: 'eval',

  entry: {
    main: './src/main.ts',
    polyfills: './src/polyfills.ts',
    styles: './src/styles.scss'
  },

  output: {
    path: resolve('./dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: rxPaths()
  },

  node: false,

  performance: {
    hints: false,
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: '@ngtools/webpack'
      },
      {
        test: /\.js$/,
        exclude: /(ngfactory|ngstyle).js$/,
        enforce: 'pre',
        use: 'source-map-loader'
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader'],
        exclude: [resolve('./src/styles.css')]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [resolve('./src/styles.css')]
      },
      {
        test: /\.scss$/,
        loader: ["raw-loader", "sass-loader?sourceMap"]
      },
      {
        test: /\.(eot|svg|cur)$/,
        loader: 'file-loader',
        options: {
          name: `[name].[ext]`,
          limit: 10000
        }
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        loader: 'url-loader',
        options: {
          name: `[name].[ext]`,
          limit: 10000
        }
      },

      // This hides some deprecation warnings that Webpack throws
      {
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: { system: true },
      }
    ]
  },

  plugins: [
    new IndexHtmlWebpackPlugin({
      input: './index.html',
      output: 'index.html',
      entrypoints: [
        'styles',
        'polyfills',
        'main'
      ]
    }),

    new AngularCompilerPlugin({
      mainPath: resolve('./src/main.ts'),
      sourceMap: true,
      nameLazyFiles: true,
      tsConfigPath: resolve('./src/tsconfig.app.json'),
      skipCodeGeneration: true
    }),

    new ProgressPlugin(),

    new CircularDependencyPlugin({
      exclude: /[\\\/]node_modules[\\\/]/
    }),

    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets'
      },
      {
        from: 'src/favicon.ico'
      }
    ])
  ]
};
