var webpack = require('webpack');
var config = require('./config.js');

console.log('env: '+process.env.NODE_ENV);

module.exports = {
  entry: {
    BlackLion: './index.js'
  },
  output: {
    libraryTarget: 'commonjs2',
    library: '[name]',
    path: __dirname + '/test/build',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/, loader: 'babel', exclude: /node_modules.(?!arus-ps-connector)/
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      '__ENV__': JSON.stringify(process.env.NODE_ENV),
      '__USERNAME__': JSON.stringify(config.get('username')),
      '__PASSWORD__': JSON.stringify(config.get('password')),
      '__PROFILE_URL__': JSON.stringify(config.get('getProfileUrl'))
    })
  ]
};
