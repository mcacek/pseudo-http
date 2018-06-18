const path = require('path');
const fs = require('fs');
const os = require('os');
const {readdirSync, statSync} = require('fs');
const {join} = require('path');
const debug = require('debug')('pseudo:profile');

const defaultProfilesPath = '.config/pseudo/profiles';

module.exports.list = function () {
	debug(`Loading profile list`);

	return new Promise((resolve, reject) => {
		const profilesPath = path.resolve(os.homedir(), defaultProfilesPath);

		if (fs.existsSync(profilesPath)) {
			resolve(readdirSync(profilesPath).filter(f => {
				return statSync(join(profilesPath, f)).isDirectory();
			})
				.map(dir => {
					return {
						name: dir,
						value: require(path.resolve(profilesPath, dir))
					};
				}));
		} else {
			reject(new Error('Profile path does not exist!'));
		}
	});
};

module.exports.load = function (profile, profilesPath) {
	debug(`Loading profile for "${profile}"`);

	if (!profile) {
		throw new Error('Invalid profile provided!');
	}

	const basePath = profilesPath ?
		path.resolve(profilesPath) : path.resolve(os.homedir(), defaultProfilesPath);
	const profilePath = path.resolve(basePath, profile);

	debug(`Loading profile from ${profilePath}`);

	return require(profilePath);
};
