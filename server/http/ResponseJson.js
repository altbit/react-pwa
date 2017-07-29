const config = require('./../../config/config');
const debug = require('debug')('server:jsonResponse');

const VALIDATION_ERROR_HTTP_CODE = 412;

const DEFAULT_ERROR = 'ERROR';
const VALIDATION_ERROR = 'ERROR_VALIDATION';

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

  withError(message, httpCode = 500, code = DEFAULT_ERROR) {
    debug('[FAIL]', message);
    this.asFail();
    this.withCode(httpCode);
    this.responseError = {
      code,
      message,
    };

    if (config.server.hideErrors && code != VALIDATION_ERROR) {
      this.responseError.message = 'Server Error';
    }
    return this.render();
  }

  withValidationErrors(errors) {
    return this.withError(errors, VALIDATION_ERROR_HTTP_CODE, VALIDATION_ERROR);
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