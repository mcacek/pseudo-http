"use strict";

const express = require("express");
const cors = require("cors");

const app = express();
const routes = require("./lib/routes");

module.exports.start = function(config, profile) {
  console.log(
    `Serving profile "${profile.label}" at http://localhost:${config.port}`
  );
  app.use(cors({ origin: true, credentials: true }));
  routes.registerProfile(app, profile);

  app.listen(config.port);
};
