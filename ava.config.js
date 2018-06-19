export default {
	ava: {
		files: [
			'test/**/*.spec.js'
		],
		sources: [
			'lib/**/*.js'
		],
		cache: true,
		concurrency: 5,
		failFast: true,
		failWithoutAssertions: false,
		tap: true,
		compileEnhancements: false
	}
};
