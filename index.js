const express = require("express");
const app = express();

// require("./startup/loggings")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/env_conf")(app);
require("./startup/validation")();
require("./startup/security")(app);

// Setup the template engine
app.set("view engine", "pug");
app.set("views", "./views");

// Middlewares
app.use(express.static("public"));

// server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;
