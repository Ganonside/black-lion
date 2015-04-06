import chai from 'chai';
import { PictureStore, PictureActions } from '../index.js';

chai.should();

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
  });

  describe('PictureActions#load', () => {
    it('should trigger PictureStore#onLoad', (done) => {
      PictureActions.load(connector, done);
    });
  });
});
