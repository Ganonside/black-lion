var webpack = require('webpack');
var config = require('./config');

module.exports = {
  entry: {
    BlackLion: "./src/main.js"
  },
  output: {
    libraryTarget: "commonjs2",
    library: "UC",
    path: './build',
    filename: "[name].js"
  },
  externals: {
    // require("jquery") is external and available
    // on the global var jQuery
    "jquery": "jQuery",
    "react": "React"
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.(?:js|jsx)$/, loader: "6to5-loader"}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__DEV__': JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      '__LOCAL__': JSON.stringify(JSON.parse(process.env.BUILD_LOCAL || 'true')),
      '__ENDPOINT_URL__': JSON.stringify(config.get('endpoint')),
      '__USERNAME__': JSON.stringify(config.get('username')),
      '__PASSWORD__': JSON.stringify(config.get('password'))
    })
  ]
};
