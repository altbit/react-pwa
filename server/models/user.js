var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const ROLE_PERSON = 'person';
const ROLE_COMPANY = 'company';
const ROLE_MANAGER = 'manager';
const ROLE_ADMIN = 'admin';

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    match: /^[\w\'\-]{1,}$/,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    match: /^[\w\'\-]{1,}$/,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true,
    match: /^[A-Z0-9a-z\._\%\+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,5}$/,
  },
  password: String,
  avatar: String,
  role: { type: String, default: ROLE_PERSON },
  isEmailVerified: { type: Boolean, default: false },
  verifyEmailToken: String,
  verifyEmailTokenExpires: Date,
  newsletter: { type: Boolean, default: false },
});
schema.plugin(timestamps);

const model = mongoose.model('User', schema);
model.ROLE_PERSON = ROLE_PERSON;
model.ROLE_COMPANY = ROLE_COMPANY;
model.ROLE_MANAGER = ROLE_MANAGER;
model.ROLE_ADMIN = ROLE_ADMIN;

module.exports = model;