var Reflux = require('reflux');

var Connector = require('./connectors/PSConnector.js');

var ProfileActions = Reflux.createActions({load: {asyncResult: true}});

var ProfileStore = Reflux.createStore({
  init() {
    console.log('init ProfileStore');

    this.listenTo(ProfileActions.load, 'loadData');
  },

  loadData: function(res) {
    console.log('in fetchData');

    console.log(res);
  }
});

ProfileActions.load.listen( function() {
  Connector.getProfile()
    .then( this.completed )
    .catch( this.failed );
});

module.exports = {
  ProfileActions: ProfileActions,
  ProfileStore: ProfileStore,
  PSConnector: Connector
};
