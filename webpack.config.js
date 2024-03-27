const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // Or 'production' for production mode
  entry: './src/index.js', // Adjust the entry point as per your project structure
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    fallback: {
      "child_process": false, // We'll set these to false as they are not used in the browser
      "fs": false, 
      "net": false,
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "path": require.resolve("path-browserify"),
      "querystring": require.resolve("querystring-es3"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "zlib": require.resolve("browserify-zlib")
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  devtool: 'source-map', // Use source maps for better debugging experience
};
