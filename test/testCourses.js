import chai from 'chai';
import { CourseStore, CourseActions } from '../index.js';

chai.should();

describe('Courses', () => {
  let connector = {
    getCourses(cb) {
      return Promise.resolve(cb);
    }
  };

  let listener;

  before(() => {
    listener = CourseStore.listen(cb => cb());
  });

  after(() => {
    listener();
  });

  describe('CourseStore#onLoad', () => {
    it('should trigger the listener', (done) => {
      CourseStore.onLoad(connector, done);
    });
  });

  describe('CourseActions#load', () => {
    it('should trigger CourseStore#onLoad', (done) => {
      CourseActions.load(connector, done);
    });
  });
});
