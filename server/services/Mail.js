const config = require('./../../config/config');
const debug = require('debug')('service:mail');
var postmark = require('postmark')(config.server.postmark.apiToken);

class MailService {
  constructor() {
    this.sendWelcome = this.sendWelcome.bind(this);
  }

  sendWelcome(user, done) {
    postmark.sendEmailWithTemplate({
      From: config.server.postmark.mailFrom,
      To: user.email,
      TemplateId: config.server.postmark.templateId,
      TemplateModel: {
        productName: config.app.appName,
        firstName: user.firstName,
        action_url: config.app.ServerApi + '/confirmEmail/' + user.verifyEmailToken,
        productAddressLine1: config.app.AddressLine1,
        productAddressLine2: config.app.AddressLine2,
      },
    }, done);
  }
}

module.exports = new MailService();
