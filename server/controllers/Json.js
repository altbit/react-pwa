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

  onMongoError(res) {
      return (mongoError) => (
        this.Response(res)
          .withError(mongoError.message)
      );
  }
}

module.exports = JsonController;
