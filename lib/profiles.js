"use strict";

const path = require("path");
const fs = require("fs");
const { readdirSync, statSync } = require("fs");
const { join } = require("path");
const debug = require("debug")("pseudo:profile");

module.exports.list = function(config) {
  debug(`Loading profile list`);

  return new Promise((resolve, reject) => {
    if (fs.existsSync(config.profilesPath)) {
      resolve(
        readdirSync(config.profilesPath)
          .filter(f => {
            return statSync(join(config.profilesPath, f)).isDirectory();
          })
          .map(dir => {
            return {
              name: dir,
              value: require(path.resolve(config.profilesPath, dir))
            };
          })
      );
    } else {
      reject(new Error("Profile path does not exist!"));
    }
  });
};

module.exports.load = function(config, profile) {
  debug(`Loading profile for "${profile}"`);

  return new Promise((resolve, reject) => {
    const profilePath = path.resolve(config.profilesPath, profile);

    debug(`Loading profile from ${profilePath}`);

    try {
      resolve(require(profilePath));
    } catch (e) {
      reject(e);
    }
  });
};
