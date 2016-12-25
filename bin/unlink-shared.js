'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Unlink project library`, 
			note: `for all services`,
			args: []
		};
	}

	console.log(chalk.yellow(`* unlink-shared: Unlinking shared library from project Serverless services...`));

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'serverless.yml')) {

			exec(`cd ${dirpath} && npm uninstall shared && cd ${dir}`);
			
			count++;

		}

	});

	console.log(chalk.green(`* unlink-shared: Unlinked shared library from ${count} Serverless services.`));

};