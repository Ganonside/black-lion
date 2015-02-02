var convict = require('convict');
var fs = require('fs');

var env = process.env.NODE_ENV || "development";

console.log("Environment is " + env);

var conf = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  endpoint: {
    doc: "The REST Endpoint to call.",
    default: "",
    env: "ENDPOINT_URL"
  },
  username: {
    doc: "Endpoint username",
    default: "",
    env: "CATALYST_USERNAME"
  },
  password: {
    doc: "Endpoint password",
    default: "",
    env: "CATALYST_PASSWORD"
  }
});


if (fs.existsSync(__dirname + '/' + env + '.json')){
  conf.loadFile(__dirname + '/' + env + '.json').validate();
} else {
  //either pull data from mongo or serve 404 error
  console.log('Config file not found, using ENV');
};






conf.validate();

module.exports = conf;
