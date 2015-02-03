var React = require('react');
var Reflux = require('reflux');

var Connector = require('../../src/connectors/PSConnector.js');

var ExampleActions = Reflux.createActions(['load']);

// Defines `load` as an asynchronous action and creates the functions `completed` and `failed`
ExampleActions.load = Reflux.createAction({asyncResult: true});
// ties the `.then` and `.catch` methods of the promise to the `completed` and `failed` functions respectively
ExampleActions.load.listenAndPromise( Connector.getProfile );

var ExampleStore = Reflux.createStore({
  init() {
    this.listenTo(ExampleActions.load.completed, 'onLoad');
  },

  onLoad: function(res) {
    this.trigger(res);
  }
});

ExampleActions.load(  );

var profile = null;
var Example = React.createClass({
  mixins: [Reflux.listenTo(ExampleStore, 'onLoad')],

  getDefaultProps() {
    return {};
  },

  getInitialState() {
    return {
      data: null
    };
  },

  render: function() {
    return (
      <div>
        <h1>Example</h1>
        <p>{this.state.data}</p>
      </div>
    );
  },

  onLoad(data) {
    this.setState({
      data: data
    });
  }

});

var render = function() {
  React.render(
    React.createElement(Example, {
      profile: profile
    }),
    document.getElementById('black-lion')
  );
}

module.exports = Example;
