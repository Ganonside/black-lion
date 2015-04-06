import chai from 'chai';
import { EventStore, EventActions } from '../index.js';

chai.should();

describe('Event', () => {
  let connector = {
    getEvents(cb) {
      return Promise.resolve(cb);
    },

    changeReadStatus(cb) {
      return Promise.resolve(cb);
    }
  };

  let listener;

  before(() => {
    listener = EventStore.listen(cb => cb());
  });

  after(() => {
    listener();
  });

  describe('EventStore#onLoad', () => {
    it('should trigger the listener', (done) => {
      EventStore.onLoad(connector, done);
    });
  });

  describe('EventActions#load', () => {
    it('should trigger EventStore#onLoad', (done) => {
      EventActions.load(connector, done);
    });
  });

  describe.skip('EventStore#onChangeReadStatus', () => {
    it('should trigger #onLoad', (done) => {
      EventStore.onChangeReadStatus(connector, done);
    });
  });

  describe.skip('EventActions#changeReadStatus', () => {
    it('should trigger #onChangeReadStatus', (done) => {
      EventActions.changeReadStatus.call(actions, connector);
    });
  });
});
