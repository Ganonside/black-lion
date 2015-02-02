var mocha = require('mocha');
var expect = require('chai').expect;
var eventually = require('chai-as-promised');

var ProfileStore = require('../build/BlackLion.js').ProfileStore;
var ProfileActions = require('../build/BlackLion.js').ProfileActions;
var Connector = require('../build/BlackLion.js').PSConnector;

console.log('testing');

describe('REST', function() {
  beforeEach(function(done) {
    promise = new Promise(function(complete) {
      complete(false);
    });
  });
  // it('getProfile', function(done) {
  //   Connector.getProfile()
  //     .then(function(res) {
  //       console.log(res);
  //       expect(res).to.have.property('SCC_GET_CONST_RESP');
  //       done();
  //     }).done(null, function(err) {
  //       done(err);
  //     });
  // });
  it('Promise', function(done) {
    expect(promise).to.equal(false);
  });
});

// describe('Main', function() {
//   it('Profile', function() {
//     ProfileActions.load();
//     expect(1).to.equal(1);
//   });
// });
