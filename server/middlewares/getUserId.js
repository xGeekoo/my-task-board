const randomId = require('../utils/randomId');

function getUserId(req, res, next) {
  if (req.cookies.userId) {
    req.userId = req.cookies.userId;
    return next();
  }

  const userId = randomId();
  res.cookie('userId', userId, {
    maxAge: 1000 * 60 * 60 * 24 * 90,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  req.userId = userId;

  next();
}

module.exports = getUserId;
