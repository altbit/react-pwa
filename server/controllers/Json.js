const ResponseJson = require('./../http/ResponseJson');

class JsonController {
  /**
   * @param res
   * @returns {ResponseJson}
   * @constructor
   */
  Response(res) {
    return new ResponseJson(res);
  }
}

module.exports = JsonController;
