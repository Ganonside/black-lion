import chai from 'chai';
import { ScheduleStore, ScheduleActions } from '../index.js';

let should = chai.should();

describe('Schedule', () => {
  let connector = {
    getSchedule(cb) {
      return Promise.resolve(cb);
    }
  };

  let listener;

  before(() => {
    listener = ScheduleStore.listen(cb => cb());
  });

  after(() => {
    listener();
  });

  describe('ScheduleStore', () => {
    it('should trigger the listener', (done) => {
      ScheduleStore.onLoad(connector, done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(ScheduleStore.onLoad.bind(ScheduleStore, conn), TypeError);
      /* eslint-enable */
    });
  });

  describe('ScheduleStore#onCustomLoad', () => {
    it('should trigger the listener', (done) => {
      ScheduleStore.onCustomLoad(connector, 'getSchedule', done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(ScheduleStore.onCustomLoad.bind(ScheduleStore, conn, 'funcName'), TypeError);
      /* eslint-enable */
    });

    it('should throw a TypeError', () => {
      let func = function() {};
      /* eslint-disable */
      should.Throw(ScheduleStore.onCustomLoad.bind(ScheduleStore, connector, func), TypeError);
      /* eslint-enable */
    });
  });

  describe('ScheduleActions#load', () => {
    it('should trigger ScheduleStore#onLoad', (done) => {
      ScheduleActions.load(connector, done);
    });
  });
});
