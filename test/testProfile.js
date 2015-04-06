import chai from 'chai';
import { ProfileStore, ProfileActions } from '../index.js';

var should = chai.should();

describe('Profile', () => {
  let connector = {
    getProfile(cb) {
      return Promise.resolve(cb);
    }
  };

  let listener;

  before(() => {
    listener = ProfileStore.listen(cb => {
      cb();
    });
  });

  after(() => {
    listener();
  });

  describe('ProfileStore#onLoad', () => {
    it('should trigger the listener', (done) => {
      ProfileStore.onLoad(connector, done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(ProfileStore.onLoad.bind(ProfileStore, conn), TypeError);
      /* eslint-enable */
    });
  });

  describe('ProfileStore#onCustomLoad', () => {
    it('should trigger the listener', (done) => {
      ProfileStore.onCustomLoad(connector, 'getProfile', done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(ProfileStore.onCustomLoad.bind(ProfileStore, conn, 'funcName'), TypeError);
      /* eslint-enable */
    });

    it('should throw a TypeError', () => {
      let func = function() {};
      /* eslint-disable */
      should.Throw(ProfileStore.onCustomLoad.bind(ProfileStore, connector, func), TypeError);
      /* eslint-enable */
    });
  });

  describe('ProfileActions#load', () => {
    it('should trigger ProfileStore#onLoad', (done) => {
      ProfileActions.load(connector, done);
    });
  });
});
