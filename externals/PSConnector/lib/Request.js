var superagent = require('superagent');

class Request {

  static get(params) {
    return new Promise((resolve, reject) => {
      // TODO: apply parameters conditionally on existence
      superagent
        .get(params.url)
        .auth(...params.auth)
        .accept(params.acceptType)
        .end((err, res) => {
          if(res.ok) {
            resolve(res);
          } else {
            reject(err);
          }
        });
    });
  }
}

module.exports = Request;
