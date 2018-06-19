#!/usr/bin/env node
'use strict';
const meow = require('meow');
const inquirer = require('inquirer');
const startServer = require('./server');
const profiles = require('./lib/profiles');
const Config = require('./lib/config');

profiles.list()
	.then(profiles => {
		const cli = meow(`
        Options
            --profile, -p  Profile name
            --port,    -P  Server port
    `, {
			flags: {
				profile: {
					type: 'string',
					alias: 'p'
				},
				port: {
					type: 'number',
					alias: 'P'
				}
			}
		});

		const config = Config.build(cli.flags);

		if (cli.flags.profile) {
			if (cli.flags.profile) {
				const profile = profiles.find(p => p.name === cli.flags.profile);

				if (profile) {
					startServer(config, profile.name);
				} else {
					console.log(`Profile "${cli.flags.profile}" not found!`);
				}
			} else {
				console.logc(cli.showHelp());
			}
		} else {
			const profileChoices = profiles.map(profile => {
				return {
					name: profile.value.label,
					value: profile.name
				};
			});

			const questions = [{
				type: 'list',
				name: 'profile',
				message: 'Choose a profile',
				choices: profileChoices
			}];

			inquirer.prompt(questions).then(answers => {
				startServer(config, answers.profile);
			});
		}
	})
	.catch(e => {
		console.log('No profiles exist!', e);
	});
