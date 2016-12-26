'use strict';

var exec = require('child_process').execSync;

var path = require('path');

var shared = require('./shared');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Remove project library`, 
			note: `for all services`,
			args: []
		};
	}

	console.log(chalk.yellow(`* remove-shared: Removing shared library from project...`));

	require('./unlink-shared.js')(args);

	var targetFilepath = path.resolve(process.env.PWD, shared.dirname);

	exec(`rm -r ${targetFilepath}`);

	console.log(chalk.green(`* remove-shared: Removed shared library from project.`));

};