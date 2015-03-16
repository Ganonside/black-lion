var convict = require('convict');
var fs = require('fs');

var env = process.env.NODE_ENV || 'test';
process.env.NODE_ENV = env;

var conf = convict({
  username: {
    doc: 'Endpoint username',
    default: '',
    env: 'CATALYST_USERNAME'
  },
  password: {
    doc: 'Endpoint password',
    default: '',
    env: 'CATALYST_PASSWORD'
  },
  getProfileUrl: {
    doc: 'The REST Endpoint for profile info.',
    default: '',
    env: 'PROFILE_URL'
  }
});

/* eslint-disable */
if (fs.existsSync(__dirname + '/' + env + '.json')) {
  conf.loadFile(__dirname + '/' + env + '.json').validate();
/* eslint-enable */
} else {
  //either pull data from mongo or serve 404 error
  console.log('Config file not found, using ENV');
}

conf.validate();

module.exports = conf;
