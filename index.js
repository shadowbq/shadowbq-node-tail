var tail = require('./lib/server');

tail({
  port: 4000,
  host: 'localhost',
  file: process.argv[2]
});
