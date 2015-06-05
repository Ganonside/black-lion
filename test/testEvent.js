import chai from 'chai';
import { EventStore, EventActions } from '../index.js';

let should = chai.should();

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

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(EventStore.onLoad.bind(EventStore, conn), TypeError);
      /* eslint-enable */
    });
  });

  describe('EventStore#onCustomLoad', () => {
    it('should trigger the listener', (done) => {
      EventStore.onCustomLoad(connector, 'getEvents', done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(EventStore.onCustomLoad.bind(EventStore, conn, 'funcName'), TypeError);
      /* eslint-enable */
    });

    it('should throw a TypeError', () => {
      let func = function() {};
      /* eslint-disable */
      should.Throw(EventStore.onCustomLoad.bind(EventStore, connector, func), TypeError);
      /* eslint-enable */
    });
  });

  describe('EventActions#load', () => {
    it('should trigger EventStore#onLoad', (done) => {
      EventActions.load(connector, done);
    });
  });

  describe('EventStore#onChangeReadStatus', () => {
    it('should trigger #onLoad', (done) => {
      EventStore.onChangeReadStatus(connector)
        .then((res) => {
          EventStore.onLoad(connector, done);
        });
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(EventStore.onChangeReadStatus.bind(EventStore, conn), TypeError);
      /* eslint-enable */
    });
  });

  describe.skip('EventActions#changeReadStatus', () => {
    it('should trigger #onChangeReadStatus', (done) => {
      EventActions.changeReadStatus.call(actions, connector);
    });
  });
});
