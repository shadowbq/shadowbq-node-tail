/**
 * @module auth
 * @description basic auth express authentication
 */
var template = require('./template');
var cookieParser = require('cookie-parser');

exports.initialize = function(userName, password, secret) {
	var hasAuth = !!userName && !!password;
	var validSessions = {};

	if (hasAuth) {
		console.log('Authorization enabled: user %s, password %s', userName, password);
	}

	exports.authenticate = function(req, res, next) {
		if (!hasAuth) {
			return next();
		}
		if (validSessions[req.session.id]) {
			return next();
		}
		if (!req.body || req.body.userName !== userName || req.body.password !== password) {
			return res.status(401).send(template.login.render({}));
		}
		validSessions[req.session.id] = true;
		next();
	};

	exports.authenticateSocket = function(socket, next) {
		if (!hasAuth) {
			return next();
		}
		cookieParser(secret)(socket.request, {}, function() {
			var sessionId = socket.request.signedCookies['connect.sid'];
			if (validSessions[sessionId]) {
				return next();
			}
			next(new Error("Authentication error"));
		});
	};

};

