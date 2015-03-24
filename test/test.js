import { expect } from 'chai';
import {
  ProfileActions,
  ProfileStore,
  PictureActions,
  PictureStore ,
  ScheduleActions,
  ScheduleStore,
  NotificationActions,
  NotificationStore,
  EventActions,
  EventStore
} from '../index.js';

describe('Reflux', () => {
  let connector;

  before(() => {
    connector = {
      getProfile(cb) {
        return new Promise((resolve, reject) => {
          // Passes the `cb` method into the `trigger` method
          resolve(cb);
        });
      },

      getPicture(cb) {
        return new Promise((resolve, reject) => {
          resolve(cb);
        });
      },

      getSchedule(cb) {
        return new Promise((resolve, reject) => {
          resolve(cb);
        });
      },

      getNotifications(cb) {
        return new Promise((resolve, reject) => {
          resolve(cb);
        });
      },

      getEvents(cb) {
        return new Promise((resolve, reject) => {
          resolve(cb);
        });
      },

      changeReadStatus(cb) {
        return new Promise((resolve, reject) => {
          resolve(cb);
        });
      }
    };
  });

  context('Profile', () => {
    let listener;

    beforeEach(() => {
      // Subscribes to changes in ProfileStore
      listener = ProfileStore.listen((done) => {
        done();
      });
    });

    afterEach(() => {
      // Unsubscribes from ProfileStore
      listener();
    });

    describe('ProfileStore#onLoad', () => {
      it('should trigger the listener', (done) => {
        // The store calls the `connector`s `getProfile` method with the arguments passed in after `connector`
        ProfileStore.onLoad(connector, done);
      });
    });

    describe('ProfileActions#load', () => {
      it('should trigger #onLoad', (done) => {
        ProfileActions.load(connector, done);
      });
    });
  });

  context('Picture', () => {
    let listener;

    beforeEach(() => {
      listener = PictureStore.listen((done) => {
        done();
      });
    });

    afterEach(() => {
      listener();
    });

    describe('PictureStore#onLoad', () => {
      it('should trigger listeners', (done) => {
        PictureStore.onLoad(connector, done);
      });
    });

    describe('PictureActions#load', () => {
      it('should trigger #onLoad', (done) => {
        PictureActions.load(connector, done);
      });
    });
  });

  context('Schedule', () => {
    let listener;

    beforeEach(() => {
      listener = ScheduleStore.listen((done) => {
        done();
      });
    });

    afterEach(() => {
      listener();
    });

    describe('ScheduleStore#onLoad', () => {
      it('should trigger listeners', (done) => {
        ScheduleStore.onLoad(connector, done);
      });
    });

    describe('ScheduleActions#load', () => {
      it('should trigger #onLoad', (done) => {
        ScheduleActions.load(connector, done);
      });
    });
  });

  context('Notification', () => {
    let listener;

    beforeEach(() => {
      listener = NotificationStore.listen((done) => {
        done();
      });
    });

    afterEach(() => {
      listener();
    });

    describe('NotificationStore#onLoad', () => {
      it('should trigger listeners', (done) => {
        NotificationStore.onLoad(connector, done);
      });
    });

    describe('NotificationActions#load', () => {
      it('should trigger #onLoad', (done) => {
        NotificationActions.load(connector, done);
      });
    });
  });

  context('Event', () => {
    let listener;

    beforeEach(() => {
      listener = EventStore.listen((done) => {
        done();
      });
    });

    afterEach(() => {
      listener();
    });

    describe('EventStore#onLoad', () => {
      it('should trigger listeners', (done) => {
        EventStore.onLoad(connector, done);
      });
    });

    describe.skip('EventStore#onChangeReadStatus', () => {
      it('should trigger #onLoad', (done) => {
        EventStore.onChangeReadStatus(connector, done);
      });
    });

    describe('EventActions#load', () => {
      it('should trigger #onLoad', (done) => {
        EventActions.load(connector, done);
      });
    });
    
    describe.skip('EventActions#changeReadStatus', () => {
      it('should trigger #onChangeReadStatus', (done) => {
        EventActions.changeReadStatus.call(actions, connector);
      })
    });
  });
});
