var Reflux = require('reflux');

/*******************************************
 *                 Actions                 *
 *******************************************/
var ProfileActions = Reflux.createActions([
  'load'
]);
var PictureActions = Reflux.createActions([
  'load'
]);
var ScheduleActions = Reflux.createActions([
  'load'
]);
var NotificationActions = Reflux.createActions([
  'load'
]);
var EventActions = Reflux.createActions([
  'load',
  'changeReadStatus'
]);

/******************************************
 *                 Stores                 *
 ******************************************/
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

    var trigger = this.trigger.bind(this);

    connector.getProfile.apply(connector, args)
      .then(trigger)
      .catch(function(err) {
        console.log(err.stack);
      });
  }

});

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

    var trigger = this.trigger.bind(this);

    connector.getPicture.apply(connector, args)
      .then(trigger)
      .catch(function(err) {
        console.log(err.stack);
      });
  }

});

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

    var trigger = this.trigger.bind(this);

    connector.getSchedule.apply(connector, args)
      .then(trigger).catch(function(err) {
        console.log(err.stack);
      });
  }

});

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

    var trigger = this.trigger.bind(this);

    connector.getNotifications.apply(connector, args)
      .then(trigger)
      .catch(function(err) {
        console.log(err.stack);
      });
  }
});

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

    var trigger = this.trigger.bind(this);

    connector.getEvents.apply(connector, args)
      .then(trigger)
      .catch(function(err) {
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

    connector.changeReadStatus.apply(this, args)
      .then(function(res) {
        
      }).catch(function(err) {
        console.log(err.stack);
      });
  }
});



module.exports = {
  'ProfileActions': ProfileActions,
  'ProfileStore': ProfileStore,
  'PictureActions': PictureActions,
  'PictureStore': PictureStore,
  'ScheduleActions': ScheduleActions,
  'ScheduleStore': ScheduleStore,
  'NotificationActions': NotificationActions,
  'NotificationStore': NotificationStore,
  'EventActions': EventActions,
  'EventStore': EventStore
};
