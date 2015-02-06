var React = require('react');
var PSConnector = require('bl-ps-connector');
var HotLoader = require('./HotLoader.jsx');

console.log('In Black-Lion');
console.log("hot reload!!!!!!!!!!!!!-");
console.log(PSConnector);

let requestParams = {
  url: __PROFILE_URL__,
  auth: [__USERNAME__, __PASSWORD__],
  acceptType: 'application/xml'
};

PSConnector.getProfile(requestParams)
  .then(res => {
    console.log(res);
  }).catch(err => {
    throw err;
  });

React.render(
  React.createElement(HotLoader, null),
  document.getElementById('hot-loader')
);
