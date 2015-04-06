import chai from 'chai';
import { CourseStore, CourseActions } from '../index.js';

let should = chai.should();

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

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(CourseStore.onLoad.bind(CourseStore, conn), TypeError);
      /* eslint-enable */
    });
  });

  describe('CourseStore#onCustomLoad', () => {
    it('should trigger the listener', (done) => {
      CourseStore.onCustomLoad(connector, 'getCourses', done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(CourseStore.onCustomLoad.bind(CourseStore, conn, 'funcName'), TypeError);
      /* eslint-enable */
    });

    it('should throw a TypeError', () => {
      let func = function() {};
      /* eslint-disable */
      should.Throw(CourseStore.onCustomLoad.bind(CourseStore, connector, func), TypeError);
      /* eslint-enable */
    });
  });

  describe('CourseActions#load', () => {
    it('should trigger CourseStore#onLoad', (done) => {
      CourseActions.load(connector, done);
    });
  });
});
