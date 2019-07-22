const { start } = require("./src/system/application");

const settings = require("./settings.json");

start(__dirname, settings).then(() => {
    console.log("Listening on port *" + settings.port);
}).catch(err => {
    console.error(err);
});
