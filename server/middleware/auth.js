const models = require('../models');
const Promise = require('bluebird');
const hashify = require('../lib/hashUtils.js');

module.exports.createSession = (req, res, next) => {
  Promise.resolve(Object.keys(req.cookies).length)
  .then((objectContainsCookies) => {
    if (!objectContainsCookies) { throw objectContainsCookies; }
  })
  .then(() => {
    req.session = {hash: req.cookies.shortlyid};
    return models.Sessions.getSession(req.session.hash);
  })
  .then((session) => {
    session.user_agent = session.user_agent || null;
    let reqUserAgent = req.headers['user-agent'] || null;
    // console.log('Session UA: ', session.user_agent, '\nRequest UA: ', reqUserAgent);
    if (session && (session.user_id !== null) && (session.user_agent === reqUserAgent)) {
      req.session.user_id = session.user_id;
      return models.Users.getUserName(req.session.user_id);
    } else if (session.user_agent !== reqUserAgent) {
      return models.Sessions.delete({hash: req.session.hash}).then((recreateSession) => {
        throw recreateSession;
      });
    } else {
      throw session;
    }
  })
  .then((username) => {
    req.session.username = username;
    next();
  })
  .catch(() => {
    return models.Sessions.create(req.headers['user-agent']).then((session) => {
      req.session = session;
      res.cookie('shortlyid', req.session.hash);
      next(); 
    });
  });
  // .then((session) => {
  //   if (session === undefined) {
  //     console.log(req);
  //   }
  //   req.session = session;
  //   res.cookies = {shortlyid: {value: req.session.hash}};
  //   next(); 
  // });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

