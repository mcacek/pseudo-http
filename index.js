#!/usr/bin/env node
'use strict';

const cli = require('./lib/cli');
const server = require('./server');
const profiles = require('./lib/profiles');
const config = require('./lib/config');

const {flags} = cli.show();
const cliConfig = config.extend(flags);

if (flags.profile) {
	profiles.load(config, flags.profile)
		.then(profile => server.start(cliConfig, profile));
} else if (flags.list) {
	cli.listProfiles(cliConfig);
} else {
	cli.promptForProfiles(cliConfig)
		.then(profile => server.start(cliConfig, profile));
}
