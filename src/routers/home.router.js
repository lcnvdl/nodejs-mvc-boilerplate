const BaseRouter = require("./base/base-router");

class PlayerRouter extends BaseRouter {
    register(app) {
        app.get("/", (req, res) => {
            this.controllers.home.getHome({ req, res });
        });
    }
}

module.exports = PlayerRouter;