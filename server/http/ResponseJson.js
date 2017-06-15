const config = require('./../../config/config');
const debug = require('debug')('server:jsonResponse');

const VALIDATION_ERROR_CODE = 412;

class ResponseJson {
  constructor(res, success = true) {
    this.res = res;
    this.isSuccess = success;
    this.responseData = null;
    this.responseError = null;
  }

  asSuccess() {
    this.isSuccess = true;
    return this;
  }

  asFail() {
    this.isSuccess = false;
    return this;
  }

  withCode(code) {
    this.res.status(code);
    return this;
  }

  withData(data) {
    debug('[OK]', data);
    this.responseData = data;
    return this.render();
  }

  withError(message, code = 500) {
    debug('[FAIL]', message);
    this.asFail();
    this.withCode(code);
    this.responseError = {
      code,
      message,
    };

    if (config.server.hideErrors && code != VALIDATION_ERROR_CODE) {
      this.responseError.message = 'Server Error';
    }
    return this.render();
  }

  withValidationErrors(errors) {
    return this.withError(errors, VALIDATION_ERROR_CODE);
  }

  withValidationError(param, msg, value) {
    return this.withValidationErrors([{
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

    return this.res.json(responseData);
  }
}

module.exports = ResponseJson;