const models = require('../models');
const Promise = require('bluebird');
const hashify = require('../lib/hashUtils.js');

module.exports.createSession = (req, res, next) => {
  if (!Object.keys(req.cookies).length) {
    req.session = {hash: hashify.salt(32).toString('hex')};
    res.cookies = {shortlyid: {value: req.session.hash}};
  } else {
    req.session = {hash: req.cookies.shortlyid};
    // console.log('******************* session ***********: ', req.session)
  }
  next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

