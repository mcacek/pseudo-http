import path from 'path';
import test from 'ava';

import profiles from '../lib/profiles';

test('should list profiles', async t => {
	const config = {
		profilesPath: path.resolve('profiles')
	};

	const profileList = await profiles.list(config);
	t.is(profileList.length, 1);
	t.is(profileList[0].name, 'example');
});

test('should fail to list profiles due to invalid path', async t => {
	const config = {
		profilesPath: path.resolve('invalid')
	};

	const error = await t.throws(async () => {
		return profiles.list(config);
	}, Error);

	t.is(error.message, 'Profile path does not exist!');
});

test('should load profile', async t => {
	const config = {
		profilesPath: path.resolve('profiles')
	};
	const profileName = 'example';

	const profile = await profiles.load(config, profileName);

	t.is(profile.label, 'Example Profile');
	t.is(profile.services.length, 1);
	t.is(profile.services[0].name, 'api');
});

test('should fail to load profile due to invalid name', async t => {
	const config = {
		profilesPath: path.resolve('profiles')
	};
	const profileName = 'invalid';

	const error = await t.throws(async () => {
		return profiles.load(config, profileName);
	}, Error);

	t.is(error.message, 'Profile path does not exist!');
});
