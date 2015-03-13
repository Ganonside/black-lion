var Reflux = require('reflux');

/*******************************************
 *                 Profile                 *
 *******************************************/
var ProfileActions = Reflux.createActions([
  'load'
]);

var ProfileStore = Reflux.createStore({
  listenables: [ProfileActions],

  /**
   * Fired when ProfileActions.load is called
   */
  onLoad: function(connector) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    connector.getProfile.apply(connector, args)
      .then(function(res) {
        this.trigger(res);
      }).catch(function(err) {
        console.log(err.stack);
      });
  }

});

/*******************************************
 *                 Picture                 *
 *******************************************/
var PictureActions = Reflux.createActions([
  'load'
]);

var PictureStore = Reflux.createStore({
  listenables: [PictureActions],

  /**
   * Fired when PictureActions.load is called
   */
  onLoad: function(connector) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    connector.getPicture.apply(connector, args)
      .then(function(res) {
        this.trigger(res);
      }).catch(function(err) {
        console.log(err.stack);
      });
  }

});

/******************************************
 *                Schedule                *
 ******************************************/
var ScheduleActions = Reflux.createActions([
  'load'
]);

var ScheduleStore = Reflux.createStore({
  listenables: [ScheduleActions],

  /**
   * Fired when ScheduleActions.load is called
   */
  onLoad: function(connector) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    connector.getSchedule.apply(connector, args)
      .then(function(res) {
        this.trigger(res);
      }).catch(function(err) {
        console.log(err.stack);
      });
  }
});

/******************************************
 *              Notification              *
 ******************************************/
var NotificationActions = Reflux.createActions([
  'load'
]);

var NotificationStore = Reflux.createStore({
  listenables: [NotificationActions],

  /**
   * Fired when NotificationActions.load is called
   */
  onLoad: function(connector) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    connector.getNotifications.apply(connector, args)
      .then(function(res) {
        this.trigger(res);
      }).catch(function(err) {
        console.log(err.stack);
      });
  }
});

/*******************************************
 *                  Event                  *
 *******************************************/
var EventActions = Reflux.createActions([
  'load',
  'changeReadStatus'
]);

var EventStore = Reflux.createStore({
  listenables: [EventActions],

  /**
   * Fired when EventActions.load is called
   */
  onLoad: function(connector) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    connector.getEvents.apply(connector, args)
      .then(function(res) {
        this.trigger(res);
      }).catch(function(err) {
        console.log(err.stack);
      });
  },

  /**
   * Fired when EventActions.changeReadStatus is called
   */
  onChangeReadStatus: function(connector) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    connector.changeReadStatus.apply(connector, args)
      .then(function() {
        this.onLoad(connector);
      }).catch(function(err) {
        console.log(err.stack);
      });
  }
});

module.exports = {
  EventStore,
  EventActions,
  NotificationStore,
  NotificationActions,
  ProfileStore,
  ProfileActions,
  PictureStore,
  PictureActions,
  ScheduleStore,
  ScheduleActions
};
