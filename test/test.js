var mocha = require('mocha');
var expect = require('chai').expect;

var ProfileStore = require('./build/BlackLion.js').ProfileStore;
var ProfileActions = require('./build/BlackLion.js').ProfileActions;
var Connector = require('./build/BlackLion.js').PSConnector;

console.log('testing');

describe('REST', function() {
  before(function(done) {
    promise = new Promise(function(resolve, reject) {
        Connector.getProfile()
          .then(function(res) {
            resolve(res);
          }).catch(function(err) {
            reject(err);
          });
    });
    done();
  });
  it('#getProfile()', function(done) {
    promise.then(function(res) {
      console.log(res);
      expect(res).to.equal(false);
      done();
    }).catch(done);
  });
});
