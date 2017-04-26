const models = require('../models');
const Promise = require('bluebird');
const hashify = require('../lib/hashUtils.js');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(Object.keys(req.cookies).length)
  .then((length) => {
    if (!length) { throw length; }
  })
  .then(() => {
    req.session = {};
    req.session.hash = req.cookies.shortlyid;
    return models.Sessions.getSession(req.session.hash);
  })
  .then((session) => {
    if (session && session.user_id !== null) {
      req.session.user_id = session.user_id;
      return models.Users.getUserName(req.session.user_id);
    } else {
      throw session;
    }
  })
  .then((username) => {
    req.session.username = username;
    next();
  })
  .catch(() => {
    return models.Sessions.create();
  })
  .then((session) => {
    req.session = session;
    res.cookies = {shortlyid: {value: req.session.hash}};
    next(); 
  });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

