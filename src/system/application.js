const express = require("express");
const app = express();
const { asyncForEach } = require("../helpers/async.helper");
const { importModule } = require("./modules-importer");

const modules = {
    services: {},
    controllers: {},
    routers: {},
    middlewares: {}
};

async function start(baseFolder, settings) {

    return new Promise((resolve, reject) => {
        asyncForEach(
            ["middlewares", "services", "controllers", "routers"],
            name => importModule(baseFolder, name, modules)).then(() => {
                Object.values(modules.routers).forEach(router => router.register(app));

                app.listen(settings.port, () => {
                    resolve();
                });
            }, err => {
                reject(err);
            });
    });
}

module.exports = {
    start
};
