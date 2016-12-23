'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Relink project library`, note: `for all services` };
	}

	console.log(chalk.yellow(`* use-shared: Ensuring access to shared library by all Serverless services...`));

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'serverless.yml')) {

			exec(`cd ${dirpath} && npm link shared && cd ${dir}`);
			
			count++;

		}

	});

	console.log(chalk.green(`* use-shared: Ensured access to shared library by ${count} Serverless services.`));

};