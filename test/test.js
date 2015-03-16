var chai = require('chai');
var assert = chai.assert;

var config = require('../config.js');

var BlackLion = require('./build/BlackLion.js');
var PSConnector = BlackLion.Connector;
var profileActions = BlackLion.ProfileActions;
var profileStore = BlackLion.ProfileStore;

console.log(BlackLion);

describe('BlackLion', function() {
  describe('Profile', function() {
    it('should return `ok`', function(done) {
      var profileParams = {
        url: JSON.stringify(config.get('getProfileUrl')),
        acceptType: 'application/xml',
        headers: {
          Authorization: 'Basic aG9ybmVyam46UGFzc3dvcmQx'
        }
      };

      profileActions.load(PSConnector, profileParams);
      profileStore.listen(function(profile) {
        console.log(JSON.stringify(profile));
        done();
      });
    });
  });
});
