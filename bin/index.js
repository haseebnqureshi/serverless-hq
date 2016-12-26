#! /usr/bin/env node

var cmd = process.argv[2] || 'undefined';

var fs = require('fs');

var filepath = `${__dirname}/${cmd}.js`;

var chalk = require('chalk');

//if there's no sls-hq command, automatically show help
if (process.argv.length < 3) {
	filepath = `${__dirname}/help.js`;
}

//overriding our filecheck logic with our sls-hq command help
else if (process.argv[3] === 'help') {
	filepath = `${__dirname}/help.js`;
}

//try and see if requested command exists
try {
	fs.accessSync(filepath);
}

//otherwise, throw an error and alert our user
catch (err) {
	console.log(chalk.red(`! sls-hq: Couldn't find command "${cmd}"...`));
	console.log(chalk.yellow(`! sls-hq: Please refer to "sls-hq help" or "sls-hq" for a list of valid commands...`));
	return;
}

//finally, try and load our command module
try {
	require(filepath)(process.argv);
}

//and throw an error if something goes wrong
catch (err) {
	console.log(chalk.red('! sls-hq: Something went wrong...'));
	console.log(chalk.red(err));
}
