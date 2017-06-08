const config = require('./../../config/config');
const debug = require('debug')('server:response');

const VALIDATION_ERROR_CODE = 412;

class Response {
  constructor(response, success = true) {
    this.response = response;
    this.isSuccess = success;
    this.responseData = null;
    this.responseError = null;
  }

  success() {
    this.isSuccess = true;
    return this;
  }

  fail() {
    this.isSuccess = false;
    return this;
  }

  code(code) {
    this.response.status(code);
    return this;
  }

  data(data) {
    debug('[OK]', data);
    this.responseData = data;
    return this.render();
  }

  error(message, code = 500) {
    debug('[FAIL]', message);
    this.fail();
    this.response.status(code);
    this.responseError = {
      code,
      message,
    };

    if (config.server.hideErrors && code != VALIDATION_ERROR_CODE) {
      this.responseError.message = 'Server Error';
    }
    return this.render();
  }

  validationErrors(errors) {
    return this.error(errors, VALIDATION_ERROR_CODE);
  }

  validationError(param, msg, value) {
    return this.validationErrors([{
      param,
      msg,
      value,
    }]);
  }

  render() {
    const responseData = { success: this.isSuccess };

    if (this.responseError) {
      responseData.error = this.responseError;
    }
    if (this.responseData) {
      responseData.data = this.responseData;
    }

    return this.response.json(responseData);
  }
}

module.exports = Response;