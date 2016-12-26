#! /usr/bin/env node

var cmd = process.argv[2] || 'undefined';

var fs = require('fs');

var filepath = `${__dirname}/${cmd}.js`;

var chalk = require('chalk');

try {
	fs.accessSync(filepath);
}
catch (err) {
	console.log(chalk.red(`! sls-hq: Couldn't find command "${cmd}"!`));
	console.log(chalk.red(`! sls-hq: Please refer to the valid list of commands below...`));
	filepath = `${__dirname}/help.js`;
}

try {
	require(filepath)(process.argv);
}
catch (err) {
	console.log(chalk.red('! sls-hq: Something went wrong...'));
	console.log(chalk.red(err));
}
