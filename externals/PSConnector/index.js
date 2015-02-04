
var Request = require('./lib/Request.js');
var Serialize = require('./lib/Serializer.js');
var parseString = require('xml2js').parseString;

/**
 * Define all the different REST Calls this Connector knows how to make and Serialize
 */
var getProfile = function() {
  console.log('in PSConnector.getProfile()');
  let httpParams = {
    url: __PROFILE_URL__,
    auth: [__USERNAME__, __PASSWORD__],
    acceptType: 'application/xml'
  };

  return new Promise((resolve, reject) => {
    Request.get(httpParams)
      .then(res => {
        let jRes;
        parseString(res.text, (err, parsedRes) => {
          jRes = parsedRes;
        });

        let profile = Serialize.profile(jRes);
        console.log(profile);

        resolve(profile);
      }).catch(err => {
        reject(err);
      });
  });
};


module.exports = {
  'getProfile': getProfile
};
