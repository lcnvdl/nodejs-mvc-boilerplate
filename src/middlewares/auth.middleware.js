const BaseMiddleware = require("./base/base-middleware");
const JsonHelper = require("../helpers/json.helper");

class AuthMiddleware extends BaseMiddleware {
    generate() {
        return function (req, res, next) {
            if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
                let opts = options || {};

                let role = (opts.role === null || (typeof opts.role === "undefined")) ? null : opts.role;
                let roles = (opts.roles === null || (typeof opts.roles === "undefined")) ? null : opts.roles;

                if ((!roles || roles.length === 0) && role !== null) {
                    roles = [role];
                }

                let data = req.headers.authorization.split(" ")[1];
                console.log("Authorization", data);

                let format = data[0];
                data = data.substr(1);

                if (format === "b") {
                    //  TODO    Autorizar
                    let publicData = JsonHelper.fromB64(data);

                    let dataForValidation = Object.assign({}, req.body);

                    if (publicData.limit && publicData.limit > 20) {
                        Object.keys(dataForValidation)
                            .filter(k => typeof dataForValidation[k] === "string" && dataForValidation[k].length > publicData.limit)
                            .forEach(k => dataForValidation[k] = dataForValidation[k].substr(0, publicData.limit));
                    }

                    dataForValidation.timestamp = publicData.timestamp;
                    dataForValidation.sessionId = publicData.sessionId;
                    dataForValidation.device = req.headers["user-agent"];

                    services.auth.validatePackage(dataForValidation, publicData.token, roles).then(userId => {
                        if (userId) {
                            res.locals.userId = userId;
                            next();
                        }
                        else {
                            console.log("Unauthorized: invalid token");
                            res.status(401).send("Unauthorized: invalid token");
                        }
                    }).catch(err => {
                        console.log("Auth error", err);
                        res.status(500).send(err);
                    });
                }
                else {
                    console.log("Unauthorized: unknown header format");
                    res.status(401).send("Unauthorized: unknown header format");
                }
            }
            else {
                res.status(401).send("Unauthorized");
            }
        };
    }
}

module.exports = AuthMiddleware;