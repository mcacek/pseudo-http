const assert = require('assert');

module.exports = {
	name: 'api',
	prefix: '/api',
	routes: [
		{
			path: '/hello',
			method: 'get',
			response: {
				message: 'Hello World!'
			},
			assertions(req, res, response) {
				try {
					assert.equal(req.query.id, 'world');
					res.json(response);
				} catch (e) {
					res.status(500).send('Assertions failed');
				}
			}

		}
	]
};
