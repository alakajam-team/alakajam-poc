const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')

const rootPathTo = pathFromRoot => path.resolve(__dirname, pathFromRoot)

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Add polyfills for only those features that we use, like Array.find,
        // and only if they're not available on our set of target browsers (see
        // "browserslist" in package.json):
        // https://babeljs.io/blog/2017/12/27/nearing-the-7.0-release
        //
        // Note that this requires Babel >= 7, still in beta at the time of
        // writing (2018-06-10), so most of the documentation you'll find for
        // this feature is not up to date. This one is:
        // https://new.babeljs.io/docs/en/next/babel-preset-env.html#usebuiltins
        useBuiltIns: 'usage'
      }
    ]
  ]
}

module.exports = {
  entry: {
    index: './client/scripts/index.ts',
    styles: './client/styles/styles.js'
  },
  output: {
    path: rootPathTo('dist/client/scripts'),
    publicPath: '/dist/client/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'awesome-typescript-loader',
          { loader: 'babel-loader', options: babelOptions }
        ]
      },
      {
        test: /\.p?css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      // Remove the massive Unicode table pulled in by the `slug` package.
      // https://www.npmjs.com/package/slug
      // https://stackoverflow.com/questions/41873334/webpack-browserify-ignore-equivalent
      {
        test: /unicode\/category\/So\.js$/,
        use: [
          { loader: 'null-loader' }
        ]
      }
    ]
  },
  context: __dirname,
  target: 'web',
  plugins: [
    new CheckerPlugin()
  ],
  // https://webpack.js.org/configuration/stats/
  stats: {
    chunks: false,
    colors: true,
    modules: false,
    performance: false,
    warnings: true
  },
  performance: {
    hints: false
  }
}