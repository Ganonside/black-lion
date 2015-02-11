var webpack = require('webpack');
var config = require('./config');

var env = config.get('env');

console.log("Environment is " + env);

var defaultConfig = {
  externals: {
    "react": "React"
  },
  module: {
    loaders: [{
      test: /\.(?:js|jsx)$/, loader: "6to5-loader"
    }]
  },
  /**
   * TODO: remove plugins, they aren't needed because they get passed in by arus-main
   */
  plugins: [
    new webpack.DefinePlugin({
      '__USERNAME__': JSON.stringify(config.get('username')),
      '__PASSWORD__': JSON.stringify(config.get('password')),
      '__PROFILE_URL__': JSON.stringify(config.get('getProfileUrl')),
      '__PICTURE_URL__': JSON.stringify(config.get('getPictureUrl'))
    })
  ]
};
var devConfig = {
  name: 'development',
  entry: {
    BlackLion: './src/main.js',
    BLExample: './examples/components/Example.jsx'
  },
  output: {
    libraryTarget: 'var',
    library: '[name]',
    path: './build',
    filename: '[name].js'
  },
  externals: defaultConfig.externals,
  module: defaultConfig.module,
  plugins: defaultConfig.plugins
};
var prodConfig = { // Not really needed since production doesn't use a bundled js file
  name: 'production',
  entry: {
    BlackLion: './index.js'
  },
  output: {
    libraryTarget: 'var',
    library: 'BlackLion',
    path: './release',
    filename: '[name].js'
  },
  externals: defaultConfig.externals,
  module: defaultConfig.module,
  plugins: defaultConfig.plugins
};
var testConfig = {
  name: 'test',
  entry: {
    BlackLion: './src/main.js'
  },
  output: {
    libraryTarget: 'commonjs2',
    library: 'BlackLion',
    path: './test/build',
    filename: '[name].js'
  },
  externals: defaultConfig.externals,
  module: defaultConfig.module,
  plugins: defaultConfig.plugins
};

switch(env) {
  case 'development':
    module.exports = devConfig;
    break;
  case 'production':
    module.exports = prodConfig;
    break;
  case 'test':
    module.exports = testConfig;
    break;
}
