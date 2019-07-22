class BaseRouter {
    constructor({ controllers, middlewares }) {
        this.middlewares = middlewares;
        this.controllers = controllers;
    }

    register(_app) {
        throw new Error("Abstract method");
    }
}

module.exports = BaseRouter;