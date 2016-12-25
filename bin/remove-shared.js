'use strict';

var exec = require('child_process').execSync;

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

	exec(`rm -r ${process.env.PWD}/shared`);

	console.log(chalk.green(`* remove-shared: Removed shared library from project.`));

};