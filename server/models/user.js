const utils = require('../lib/hashUtils');
const Model = require('./model');

// Write you user database model methods here
class User extends Model {
  constructor() {
    super('users');
  }

  create(user) {
    // console.log('heheheheheheheheheeheheheheh', utils.salt);
    // utils.salt()
    // .then((err, salt) => {
    //   user.salt = salt;
    //   user.password = utils.hash.update(user.password + salt).digest('hex');
    //   console.log('***********************************', user);

    //   return super.create.call(this, user);
    //   }
    // );
    user.salt = utils.salt(32).toString('hex');
    user.password = utils.hash('sha256').update(user.password + user.salt).digest('hex');

    return super.create.call(this, user);
  }
}

module.exports = new User();