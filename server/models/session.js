const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you session database model methods here
class Session extends Model {
  constructor() {
    super('sessions');
  }

  create(userAgent) {
    let session = {hash: utils.salt(32).toString('hex'), user_agent: userAgent};
    return super.create.call(this, session).then(() => { return session; });
  }

  setUser(session) {

  }

  getSession(hash) {
    let options = {'hash': hash};
    return super.get.call(this, options)
    .then((session) => {
      return session;
    });
  }
}

module.exports = new Session();
