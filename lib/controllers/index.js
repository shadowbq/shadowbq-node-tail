/**
 * @module controllers/index
 */
var path = require('path');
var template = require('../template');

exports.initialize = function(config) {
	exports.get = index;
	exports.post = index;

	function index(req, res) {
		res.send(template.index.render({
			name : path.basename(config.file),
			host : config.host,
			mode : config.mode,
			port : config.port,
			proto : config.proto,
		}));
	}
};
