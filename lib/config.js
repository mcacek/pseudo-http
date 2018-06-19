const rc = require('rc');

const defaults = {
	port: '3000'
};

module.exports.build = function (extendedOptions = {}) {
	return rc('pseudo', defaults, extendedOptions);
};
