var PSConnector = require('../externals/PSConnector/index.js');

console.log('In Black-Lion');
PSConnector.getProfile()
  .then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
