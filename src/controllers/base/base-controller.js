class BaseController {
    constructor({ services, middlewares }) {
        this.services = services;
    }
}

module.exports = BaseController;