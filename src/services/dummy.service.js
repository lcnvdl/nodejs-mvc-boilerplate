const BaseService = require("./base/base-service");

class DummyService extends BaseService {
    getMessage() {
        return "Hello world!";
    }
}

module.exports = DummyService;