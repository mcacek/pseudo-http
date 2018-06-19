import test from 'ava';
import sinon from 'sinon';
import proxyquire from 'proxyquire';

let routes;

test.before(t => {
	t.context.proxy = sinon.stub();
	routes = proxyquire('../lib/routes', {'express-http-proxy': t.context.proxy});
});

test.beforeEach(t => {
	t.context.app = {
		get: sinon.stub(),
		post: sinon.stub()
	};
	t.context.proxy.reset();
});

test('should support an empty route case', t => {
	const profile = {
		services: [
			{routes: []}
		]
	};

	routes.registerProfile(t.context.app, profile);

	t.is(t.context.app.get.callCount, 0);
	t.is(t.context.app.post.callCount, 0);
});

test('should register get and post routes', t => {
	const getRoute = {
		method: 'get',
		path: '/hello',
		options: {}
	};
	const postRoute = {
		method: 'post',
		path: '/world',
		options: {}
	};
	const profile = {
		services: [
			{routes: [getRoute, postRoute]}
		]
	};

	routes.registerProfile(t.context.app, profile);

	t.is(t.context.app.get.callCount, 1);
	t.is(t.context.app.post.callCount, 1);
});

test('should register a proxy route', t => {
	const proxyGetRoute = {
		proxy: 'http://smartthings.com',
		method: 'get',
		path: '/hello',
		options: {}
	};
	const profile = {
		services: [
			{routes: [proxyGetRoute]}
		]
	};

	routes.registerProfile(t.context.app, profile);

	t.is(t.context.app.get.callCount, 1);
	t.is(t.context.app.post.callCount, 0);
	t.true(t.context.proxy.calledWith(proxyGetRoute.proxy, proxyGetRoute.options));
});
