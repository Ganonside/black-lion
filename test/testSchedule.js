import chai from 'chai';
import { ScheduleStore, ScheduleActions } from '../index.js';

chai.should();

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
  });

  describe('ScheduleActions#load', () => {
    it('should trigger ScheduleStore#onLoad', (done) => {
      ScheduleActions.load(connector, done);
    });
  });
});
