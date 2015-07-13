var Reflux = require('reflux');

/*******************************************
 *                 Actions                 *
 *******************************************/
var ProfileActions = Reflux.createActions([
  'load',
  'customLoad'
]);
var PictureActions = Reflux.createActions([
  'load',
  'customLoad'
]);
var ScheduleActions = Reflux.createActions([
  'load',
  'customLoad'
]);
var SubjectActions = Reflux.createActions([
  'load',
  'customLoad'
]);
var CourseActions = Reflux.createActions([
  'load',
  'customLoad'
]);
var NotificationActions = Reflux.createActions([
  'load',
  'customLoad'
]);
var EventActions = Reflux.createActions([
  'load',
  'customLoad',
  'changeReadStatus'
]);
var LovActions = Reflux.createActions([
  'load',
  'customLoad'
]);
var UCIDActions = Reflux.createActions({
  'lookup': { children: ['completed', 'failed'] }
});

/******************************************
 *                 Stores                 *
 ******************************************/
var ProfileStore = Reflux.createStore({
  listenables: [ProfileActions],

  /**
   * Fired when ProfileActions.load is called
   */
  onLoad: function(connector) {
    var args = [connector, 'getProfile'];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    load.apply(this, args);
  },

  onCustomLoad: function(connector, funcName) {
    load.apply(this, arguments);
  }
});

var PictureStore = Reflux.createStore({
  listenables: [PictureActions],

  /**
   * Fired when PictureActions.load is called
   */
  onLoad: function(connector) {
    var args = [connector, 'getPicture'];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    load.apply(this, args);
  },

  onCustomLoad: function(connector, funcName) {
    load.apply(this, arguments);
  }
});

var ScheduleStore = Reflux.createStore({
  listenables: [ScheduleActions],

  /**
   * Fired when ScheduleActions.load is called
   */
  onLoad: function(connector) {
    var args = [connector, 'getSchedule'];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    load.apply(this, args);
  },

  onCustomLoad: function(connector, funcName) {
    load.apply(this, arguments);
  }
});

var SubjectStore = Reflux.createStore({
  listenables: [SubjectActions],

  onLoad: function(connector) {
    var args = [connector, 'getSubjects'];
    for (var i = 1; i < arguments.length; ++i) {
      args.push(arguments[i]);
    }

    load.apply(this, args);
  },

  onCustomLoad: function(connector, funcName) {
    load.apply(this, arguments);
  }
});

var CourseStore = Reflux.createStore({
  listenables: [CourseActions],

  onLoad: function(connector) {
    var args = [connector, 'getCourses'];
    for (var i = 1; i < arguments.length; ++i) {
      args.push(arguments[i]);
    }

    load.apply(this, args);
  },

  onCustomLoad: function(connector, funcName) {
    load.apply(this, arguments);
  }
});

var NotificationStore = Reflux.createStore({
  listenables: [NotificationActions],

  /**
   * Fired when NotificationActions.load is called
   */
  onLoad: function(connector) {
    var args = [connector, 'getNotifications'];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    load.apply(this, args);
  },

  onCustomLoad: function(connector, funcName) {
    load.apply(this, arguments);
  }
});

var EventStore = Reflux.createStore({
  listenables: [EventActions],

  /**
   * Fired when EventActions.load is called
   */
  onLoad: function(connector) {
    var args = [connector, 'getEvents'];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    load.apply(this, args);
  },

  onCustomLoad: function(connector, funcName) {
    load.apply(this, arguments);
  },

  /**
   * Fired when EventActions.changeReadStatus is called
   */
  onChangeReadStatus: function(connector) {
    if (typeof connector !== 'object') {
      throw new TypeError('Type of connector is '+typeof connector+'. Expected an object\n\tconnector = '+connector);
    }

    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    return new Promise(function(resolve, reject) {
      connector.changeReadStatus.apply(this, args)
        .then(resolve)
        .catch(reject);
    });

  }
});

var LovStore = Reflux.createStore({
  listenables: [LovActions],

  onLoad: function(connector) {
    var args = [connector, 'getLovs'];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    load.apply(this, args);
  },

  onCustomLoad: function(connector, funcName) {
    load.apply(this, arguments);
  }
});

var UCIDLookupStore = Reflux.createStore({
  //{status: "Success", providedIdType: "6+2 ID", emplid: "100000013", firstName: "Donald", lastName: "Osmond"}

  listenables: [UCIDActions],

  init: function(){
    this.status = '';
    this.emplid = '';
    this.firstName = '';
    this.lastName ='';
    this.listenTo(UCIDActions.lookup,this.onLookupUCID);
  },

  getInitialState: function() {
        return {
          status: "",
          emplid: "",
          firstName: "",
          lastName: ""
        }
  },

  /**
   * Fired when LookupUCID is called
   */
   onLookupUCID: function(connector) {

    if (typeof connector !== 'object') {
      throw new TypeError('Type of connector is '+typeof connector+'. Expected an object\n\tconnector = '+connector);
    }

    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var p = new Promise(function(resolve, reject) {
      connector.lookupUCID.apply(this, args)
        .then(resolve)
        .catch(reject);
    });

    //promise is resolved
    p.then(function(val){
      this.status=val.status;
      this.emplid=val.emplid;
      this.firstName=val.firstName;
      this.lastName=val.lastName;

      //complete async action
      UCIDActions.lookup.completed({
        status: this.status,
        emplid: this.emplid,
        firstName: this.firstName,
        lastName: this.lastName
      });
    });
  },

  onLookupCompleted: function(data){
    this.trigger(data);
  }

});

/**
 * Dynamic load function that is used in all the above stores to retrieve data
 */
var load = function(connector, funcName) {
  if (typeof connector !== 'object') {
    throw new TypeError('Type of connector is '+typeof connector+'. Expected an object\n\tconnector = '+connector);
  } else if (typeof funcName !== 'string') {
    throw new TypeError('Type of funcName is '+typeof funcName+'. Expected a string\n\tfuncName = '+funcName);
  }

  var args = [];
  for (var i = 2; i < arguments.length; i++) {
    args.push(arguments[i]);
  }

  var trigger = this.trigger.bind(this);

  connector[funcName].apply(connector, args)
    .then(trigger)
    .catch(function(err) {
      console.log(err.stack);
    });
};

module.exports = {
  'ProfileActions': ProfileActions,
  'ProfileStore': ProfileStore,
  'PictureActions': PictureActions,
  'PictureStore': PictureStore,
  'ScheduleActions': ScheduleActions,
  'ScheduleStore': ScheduleStore,
  'SubjectActions': SubjectActions,
  'SubjectStore': SubjectStore,
  'CourseActions': CourseActions,
  'CourseStore': CourseStore,
  'NotificationActions': NotificationActions,
  'NotificationStore': NotificationStore,
  'EventActions': EventActions,
  'EventStore': EventStore,
  'LovActions': LovActions,
  'LovStore': LovStore,
  'UCIDLookupStore': UCIDLookupStore,
  'UCIDActions': UCIDActions
};
