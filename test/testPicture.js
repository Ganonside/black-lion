import chai from 'chai';
import { PictureStore, PictureActions } from '../index.js';

let should = chai.should();

describe('Picture', () => {
  let connector = {
    getPicture(cb) {
      return Promise.resolve(cb);
    }
  };

  let listener;

  before(() => {
    listener = PictureStore.listen(cb => cb());
  });

  after(() => {
    listener();
  });

  describe('PictureStore#onLoad', () => {
    it('should trigger the listener', (done) => {
      PictureStore.onLoad(connector, done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(PictureStore.onLoad.bind(PictureStore, conn), TypeError);
      /* eslint-enable */
    });
  });

  describe('PictureStore#onCustomLoad', () => {
    it('should trigger the listener', (done) => {
      PictureStore.onCustomLoad(connector, 'getPicture', done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(PictureStore.onCustomLoad.bind(PictureStore, conn, 'getPicture'), TypeError);
      /* eslint-enable */
    });

    it('should throw a TypeError', () => {
      let func = function() {};
      /* eslint-disable */
      should.Throw(PictureStore.onCustomLoad.bind(PictureStore, connector, func), TypeError);
      /* eslint-enable */
    });
  });

  describe('PictureActions#load', () => {
    it('should trigger PictureStore#onLoad', (done) => {
      PictureActions.load(connector, done);
    });
  });
});
