import test from 'ava';

import config from '../lib/config';

test('config defaults', t => {
	t.is(config.port, '3000');
	t.is(config.profilesPath, 'profiles');
});

test('config with overrides', t => {
	const updatedConfig = config.extend({
		port: '3001'
	});
	t.is(updatedConfig.port, '3001');
});
