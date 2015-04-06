import chai from 'chai';
import { ProfileStore, ProfileActions } from '../index.js';

chai.should();

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
  });

  describe('ProfileActions#load', () => {
    it('should trigger ProfileStore#onLoad', (done) => {
      ProfileActions.load(connector, done);
    });
  });
});
