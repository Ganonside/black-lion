import chai from 'chai';
import { SubjectStore, SubjectActions } from '../index.js';

chai.should();

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
  });

  describe('SubjectActions#load', () => {
    it('should trigger SubjectStore#onLoad', (done) => {
      SubjectActions.load(connector, done);
    });
  });
});
