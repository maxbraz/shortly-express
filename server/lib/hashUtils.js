let crypto = require('crypto');
var Promise = require('bluebird');
//crypto = Promise.promisifyAll(crypto);

/************************************************************/
// Add any hashing utility functions below
/************************************************************/

module.exports.salt = crypto.randomBytes;
// module.exports.salt = () => {return crypto.randomBytesAsync(32, (err, buf) => {
//   if (err) throw err;
//   return buf.toString('hex');
// });};

module.exports.hash = crypto.createHash;
