var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var morgan = require('morgan');
var http = require('http');
var https = require('https');
var io = require('socket.io');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var auth = require('./auth');
var indexController = require('./controllers/index');
var helperUtils = require('./helper');

exports.helper = helperUtils;

var defaults = {
	host   : 'localhost',
	port   : 4000,
	key    : path.join(__dirname, '..', 'key'),
	cert   : path.join(__dirname, '..', 'cacert.pem'),
	mode   : 'scrollBottom',
	secret : 'the-secret',
	skip_tls : false,
	proto  : 'https',
	retry  : '',
	lines  : '',
};

module.exports = function(options) {

	for (var prop in defaults) {
		if (options[prop] === undefined) {
			options[prop] = defaults[prop];
		}
	}

	try {
		options.key  = fs.readFileSync(options.key);
		options.cert = fs.readFileSync(options.cert);
	} catch(e) {
		options.skip_tls = true;
		console.log('Skipping TLS, key or cert notfound');
	}

	var spawn_args = [];

	spawn_args.push('-f');

	if (options.retry) { spawn_args.push('--retry') }
	if (helperUtils.isNumeric(options.lines)) { spawn_args.push("-n " + options.lines) }

	spawn_args.push(options.file);

	var tail = spawn('/usr/bin/tail', spawn_args);
	var app = express();

	if (options.skip_tls ) {
		options.proto = 'http';
		var server = http.Server(app);
	} else {
		var server = https.Server({
			key  : options.key,
			cert : options.cert,
		}, app);
	}
	auth.initialize(options.user, options.pass, options.secret);

	app.use(morgan('combined'));
	app.use(bodyParser.urlencoded({ extended: true }));
	//eval(pry.it);
	app.use(express.static(__dirname + '/../public'));
	app.use(session({
		secret: options.secret,
		cookie: {
			secure: true,
			maxAge: 60000,
		},
		resave: true,
		saveUninitialized: true,
	}));
	app.use(auth.authenticate);

	indexController.initialize(options);
	app.get("/*", indexController.get);
	app.post("/*", indexController.post);

	var ioServer = io(server);

	//ioServer.set('log level', 1);
	ioServer.use(auth.authenticateSocket);
	ioServer.sockets.on('connection', function (socket) {
		tail.stdout.on("data", function (data) {
			socket.emit('log', data.toString("utf8"));
		});
	});

	server.listen(options.port);

  console.log('tail %s and listen on %s://%s:%s/', options.file, options.proto, options.host, options.port );


};
