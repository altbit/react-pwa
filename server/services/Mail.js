const config = require('./../../config/config');
const debug = require('debug')('service:mail');
var postmark = require('postmark')(config.server.postmark.apiToken);

class MailService {
  constructor() {
    this.sendWelcome = this.sendWelcome.bind(this);
  }

  sendWelcome(user, done) {
    debug('sending email to', user.email, '...');
    postmark.sendEmailWithTemplate({
      From: config.server.postmark.mailFrom,
      To: user.email,
      TemplateId: config.server.postmark.templateId,
      TemplateModel: {
        productName: config.app.appName,
        firstName: user.firstName,
        action_url: config.app.ServerApi + '/user/confirmEmail/' + user.verifyEmailToken,
        productAddressLine1: config.server.postmark.AddressLine1,
        productAddressLine2: config.server.postmark.AddressLine2,
      },
    }, (err, res) => {
      if (err) {
        debug('email sending error', err);
      } else {
        debug('email sent', res);
      }

      if (done) {
        done();
      }
    });
  }
}

module.exports = new MailService();
