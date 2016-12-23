#! /usr/bin/env node

var cmd = process.argv[2] || 'undefined';

var fs = require('fs');

var filepath = `${__dirname}/${cmd}.js`;

var chalk = require('chalk');

try {
	fs.accessSync(filepath);
}
catch (err) {
	filepath = `${__dirname}/help.js`;
}

try {
	require(filepath)(process.argv);
}
catch (err) {
	console.log(chalk.red('! sls-hq: Something went wrong...'));
	console.log(chalk.red(err));
}
