var request = require('superagent');
var parseString = require('xml2js').parseString;

class PSConnector {
  static getProfile() {
    return new Promise((resolve, reject) => {
      request
        .get(__ENDPOINT_URL__)
        .auth(__USERNAME__, __PASSWORD__)
        .set('application/json')
        .end(res => {
          let jRes;
          if(res.ok) {
            parseString(res.text, (err, parsed) => {
              jRes = parsed;
            });
            console.log('jRes', jRes);
            resolve(jRes);
          } else {
            reject(res);
          }
        });
    });
  }
}

module.exports = PSConnector;
