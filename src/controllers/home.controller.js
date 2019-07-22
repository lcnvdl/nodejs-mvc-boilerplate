const BaseController = require("./base/base-controller");

class HomeController extends BaseController {
    getHome({ res }) {
        res.json({ message: this.services.dummy.getMessage() });
    }
}

module.exports = HomeController;