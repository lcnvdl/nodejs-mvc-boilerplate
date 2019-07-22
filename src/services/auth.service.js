const BaseService = require("./base/base-service");

class AuthService extends BaseService {
    validatePackage(dataForValidation, token, roles) {
        //  Should return a promise with the user ID
        return Promise.reject("Not implemented");
    }
}

module.exports = AuthService;