require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const profiles = require('./lib/profiles');
const routes = require('./lib/routes');

module.exports = function (config, profileName) {
	const profile = profiles.load(profileName);

	console.log(`Serving profile "${profile.label}" at http://localhost:${config.port}`);
	app.use(cors({origin: true, credentials: true}));
	routes.registerProfile(app, profile);

	app.listen(config.port);
};
