class BaseMiddleware {
    generate() {
        throw new Error("Abstract method");
    }
}

module.exports = BaseMiddleware;