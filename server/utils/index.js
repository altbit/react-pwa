const config = require('./../../config/config');

var jwt = require('jsonwebtoken');

function generateToken(user) {
  var u = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    _id: user._id.toString(),
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
  };

  return token = jwt.sign(u, config.server.jwt.secret, {
    expiresIn: config.server.jwt.expire,
  });
}

function getCleanUser(user) {
  if(!user) return {};

  var u = user.toJSON();
  return {
    _id: u._id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
    updatedAt: u.updatedAt,
    avatar: u.avatar,
    isEmailVerified: u.isEmailVerified
  }
}

module.exports = {
  getCleanUser: getCleanUser,
  generateToken: generateToken,
};
