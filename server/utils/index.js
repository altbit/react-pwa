const config = require('./../../config/config');

var jwt = require('jsonwebtoken');

function generateToken(user) {
  //Dont use password and other sensitive fields
  //Use fields that are useful in other parts of the app/collections/models
  var u = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    _id: user._id.toString(),
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified //used to prevent creating posts w/o verifying emails
  };

  return token = jwt.sign(u, config.server.jwt.secret, {
    expiresIn: config.server.jwt.expire
  });
}

//strips internal fields like password and verifyEmailToken etc
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
  generateToken: generateToken
}