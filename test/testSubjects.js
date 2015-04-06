import chai from 'chai';
import { SubjectStore, SubjectActions } from '../index.js';

let should = chai.should();

describe('Subjects', () => {
  let connector = {
    getSubjects(cb) {
      return Promise.resolve(cb);
    }
  };

  let listener;

  before(() => {
    listener = SubjectStore.listen(cb => cb());
  });

  after(() => {
    listener();
  });

  describe('SubjectStore#onLoad', () => {
    it('should trigger the listener', (done) => {
      SubjectStore.onLoad(connector, done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(SubjectStore.onLoad.bind(SubjectStore, conn), TypeError);
      /* eslint-enable */
    });
  });

  describe('SubjectStore#onCustomLoad', () => {
    it('should trigger the listener', (done) => {
      SubjectStore.onCustomLoad(connector, 'getSubjects', done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(SubjectStore.onCustomLoad.bind(SubjectStore, conn, 'funcName'), TypeError);
      /* eslint-enable */
    });

    it('should throw a TypeError', () => {
      let func = function() {};
      /* eslint-disable */
      should.Throw(SubjectStore.onCustomLoad.bind(SubjectStore, connector, func), TypeError);
      /* eslint-enable */
    });
  });

  describe('SubjectActions#load', () => {
    it('should trigger SubjectStore#onLoad', (done) => {
      SubjectActions.load(connector, done);
    });
  });
});
