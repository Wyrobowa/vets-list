const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const sourcePathAdmin = path.join(__dirname, './public/js/src');
const sourcePathFront = path.join(__dirname, './public/js/index.js');
const distPath = path.join(__dirname, './public/dist');

module.exports = (env = {}) => {
  const isProduction = env.production === true;
  const publicPath = env.public_path;

  return {
    entry: {
      admin: sourcePathAdmin,
      main: sourcePathFront,
    },

    output: {
      path: distPath,
      chunkFilename: isProduction ? '[name].[chunkhash].js' : '[name].js',
      filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
      publicPath,
    },

    optimization: {
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Split vendor code to its own chunk(s)
          vendors: {
            test: /[\\/]node_modules[\\/]/i,
            chunks: 'all',
          },
        },
      },
      // The runtime should be in its own chunk
      runtimeChunk: {
        name: 'runtime',
      },
    },

    module: {
      rules: [{
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true, // true outputs JSX tags
            },
          },
        ],
      }],
    },

    devtool: isProduction ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  };
};
