import chai from 'chai';
import { LovActions, LovStore } from '../index.js';

let should = chai.should();

describe('Lov', () => {
  let connector = {
    getLovs(cb) {
      return Promise.resolve(cb);
    }
  };

  let listener;

  before(() => {
    listener = LovStore.listen((cb) => cb());
  });

  after(() => {
    listener();
  });

  describe('LovStore#onLoad', () => {
    it('should trigger the listener', (done) => {
      LovStore.onLoad(connector, done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      should.Throw(LovStore.onLoad.bind(LovStore, conn), TypeError);
    });
  });

  describe('LovStore#onCustomLoad', () => {
    it('should trigger the listener', (done) => {
      LovStore.onCustomLoad(connector, 'getLovs', done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      should.Throw(LovStore.onCustomLoad.bind(LovStore, conn, 'funcName'), TypeError);
    });

    it('should throw a TypeError', () => {
      let func = function() {};
      should.Throw(LovStore.onCustomLoad.bind(LovStore, connector, func), TypeError);
    });
  });

  describe('SubjectActions#load', () => {
    it('should trigger the listener', (done) => {
      LovActions.load(connector, done);
    });
  });
});
