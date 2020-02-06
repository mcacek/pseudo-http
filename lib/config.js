"use strict";

const os = require("os");
const path = require("path");
const rc = require("rc");

const defaults = {
  port: "3000",
  profilesPath: path.resolve(os.homedir(), ".config/pseudo/profiles")
};

const config = rc("pseudo", defaults);

module.exports = config;
module.exports.extend = function(options = {}) {
  return Object.assign(config, options);
};
