const parseCookies = (req, res, next) => {
  req.cookies = {};
  if (!req.headers.cookie) {
    next();
  } else {

    for (let cookie of req.headers.cookie.split(';')) {
      let kookie = cookie.trim().split('=');
      req.cookies[kookie[0]] = kookie[1];
    }
    next();
  }
};

module.exports = parseCookies;