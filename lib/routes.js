"use strict";

const debug = require("debug")("pseudo:routes");
const proxy = require("express-http-proxy");

module.exports.registerProfile = function(app, profile) {
  debug(`Registering routes for "${profile.label}" profile`);

  profile.services.forEach(service => {
    service.routes.forEach(route => {
      const routePath = buildPath(service.prefix, route.path);

      if (route.proxy) {
        console.log(
          `Registering proxy route ${route.method.toUpperCase()} "${routePath}" to "${
            route.proxy
          }"`
        );
        app[route.method](routePath, proxy(route.proxy, route.options));
      } else {
        console.log(
          `Registering route ${route.method.toUpperCase()} "${routePath}"`
        );
        app[route.method](routePath, (req, res) => {
          if (route.assertions) {
            route.assertions(req, res, route, route.response);
          } else {
            res.json(route.response);
          }
        });
      }
    });
  });
};

function buildPath(prefix, path) {
  if (prefix) {
    return `${prefix}${path}`;
  }

  return path;
}
