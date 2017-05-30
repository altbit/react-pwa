const config = require('./../../config/config');

var postmark = require("postmark")(config.server.postmarkApiToken);
var async = require('async');
var crypto = require('crypto');

let sendWelcomeEmail = (user, host, finalCB) => {
  host = host.indexOf('localhost') >= 0 ? 'http://' + host : 'https://' + host;

  async.waterfall([
      function(done) {
        crypto.randomBytes(15, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        user.verifyEmailToken = token;
        user.verifyEmailTokenExpires = Date.now() + 3600000 * 24; // 24 hours
        user.isEmailVerified = false; 
        user.save(function(err) {
          done(err, user);
        });
      },
      function(user, done) {
        postmark.sendEmailWithTemplate({
          "From": config.server.mailFrom,
          "To": user.email,
          "TemplateId": 111,
          "TemplateModel": {
            "product_name": "React PWA",
            "firstName": user.firstName,
            "action_url": host + '/validateEmail/' + user.verifyEmailToken,
            "lastName": user.lastName,
            "sender_name": "React PWA",
            'sender_name_Value': 'Webmaster',
            'product_name_Value': 'React-PWA-Example',
            "product_address_line1": "Queens Road",
            "product_address_line2": "London"
          }
        }, done);
      }
    ],
    function(err) {
      if (err) {
        console.log('Could not send welcome email to: ' + user.email);
        console.error(err);
        if (finalCB) {
          finalCB({
            message: 'Could not send welcome email to: ' + user.email
          });
        }
      } else {
        if (finalCB) {
          finalCB();
        }
      }
    });
};

module.exports = {
  sendWelcomeEmail,
};