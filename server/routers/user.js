const config = require('./../../config/config');
const debug = require('debug')('router:user');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const UserController = require('./../controllers/User');

router.post('/users/signup/intro', UserController.postSignupIntro);
router.post('/users/signup/complete', UserController.postSignupComplete);
router.post('/users/signin', UserController.postSignIn);
router.get('/user', UserController.getUser);
router.get('/user/confirmEmail/:token', UserController.confirmEmail);

module.exports = router;