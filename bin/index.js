#! /usr/bin/env node

var cmd = process.argv[2] || 'undefined';

var fs = require('fs');

var filepath = `${__dirname}/${cmd}.js`;

try {
	fs.accessSync(filepath);
}
catch (err) {
	console.error('! sls-hq: Please specify a valid command...');
	process.exit();
}

try {
	require(filepath)(process.argv);
}
catch (err) {
	console.error('! sls-hq: Something went wrong...');
	console.error(err);
}
