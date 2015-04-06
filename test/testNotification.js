import chai from 'chai';
import { NotificationStore, NotificationActions } from '../index.js';

chai.should();

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
  });

  describe('NotificationActions#load', () => {
    it('should trigger NotificationStore#onLoad', (done) => {
      NotificationActions.load(connector, done);
    });
  });
});
