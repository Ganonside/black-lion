var chai = require('chai');
var assert = chai.assert;

var config = require('../config.js');

var BlackLion = require('./BlackLion.js');
var PSConnector = BlackLion.Connector;
var profileActions = BlackLion.ProfileActions;
var profileStore = BlackLion.ProfileStore;

console.log(BlackLion);

describe('BlackLion', function() {
  describe('Profile', function() {
    it('should return `ok`', function(done) {
      var profileParams = {
        url: JSON.stringify(config.get('getProfileUrl')),
        auth: [JSON.stringify(config.get('username')), JSON.stringify(config.get('password'))],
        acceptType: 'application/xml'
      };

      profileActions.load(PSConnector, profileParams);
      profileStore.listen(function(profile) {
        console.log(JSON.stringify(profile));
        done();
      });
    });
  });
});
