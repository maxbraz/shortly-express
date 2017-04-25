const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you user database model methods here
class User extends Model {
  constructor() {
    super('users');
  }

  create(user) {
    user.salt = utils.salt(32).toString('hex');
    user.password = utils.hash('sha256').update(user.password + user.salt).digest('hex');

    return super.create.call(this, user);
  }

  verify(user) {
    let options = {username: user.username};

    return super.get.call(this, options).then((data) => {
      if (data === undefined){
        return false;
      } else {
        let salt = data.salt;
        return (utils.hash('sha256').update(user.password + salt).digest('hex') === data.password);
      }
    });
  }
}

module.exports = new User();