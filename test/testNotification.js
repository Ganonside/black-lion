import chai from 'chai';
import { NotificationStore, NotificationActions } from '../index.js';

let should = chai.should();

describe('Notification', () => {
  let connector = {
    getNotifications(cb) {
      return Promise.resolve(cb);
    }
  };

  let listener;

  before(() => {
    listener = NotificationStore.listen(cb => cb());
  });

  after(() => {
    listener();
  });

  describe('NotificationStore#onLoad', () => {
    it('should trigger the listener', (done) => {
      NotificationStore.onLoad(connector, done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(NotificationStore.onLoad.bind(NotificationStore, conn), TypeError);
      /* eslint-enable */
    });
  });

  describe('NotificationStore#onCustomLoad', () => {
    it('should trigger the listener', (done) => {
      NotificationStore.onCustomLoad(connector, 'getNotifications', done);
    });

    it('should throw a TypeError', () => {
      let conn = function() {};
      /* eslint-disable */
      should.Throw(NotificationStore.onCustomLoad.bind(NotificationStore, conn, 'funcName'), TypeError);
      /* eslint-enable */
    });

    it('should throw a TypeError', () => {
      let func = function() {};
      /* eslint-disable */
      should.Throw(NotificationStore.onCustomLoad.bind(NotificationStore, connector, func), TypeError);
      /* eslint-enable */
    });
  });

  describe('NotificationActions#load', () => {
    it('should trigger NotificationStore#onLoad', (done) => {
      NotificationActions.load(connector, done);
    });
  });
});
