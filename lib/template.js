var fs = require('fs');
var path = require('path');
var Hogan = require('hogan.js');

var templatesPath = path.join(__dirname, '..', "views");

var template = initialize();

module.exports = template;

function initialize() {
	var templates = {};
	var files = fs.readdirSync(templatesPath);
	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var data = fs.readFileSync(path.join(templatesPath, file), 'utf-8');
		var fileName = path.basename(file, '.html');
		templates[fileName] = Hogan.compile(data);
	}
	return templates;
}

