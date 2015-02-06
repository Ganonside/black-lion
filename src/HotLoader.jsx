var React = require('react');

var HotLoader = React.createClass({

  render: function() {
    console.log("log");
    return (
      <div>
        <h1>Something</h1>
        <p>focus</p>
      </div>
    );
  }

});

module.exports = HotLoader;
