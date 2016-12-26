'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Display info`, 
			note: `for all services`,
			args: []
		};
	}

	console.log(chalk.yellow(`* info: Displaying info on all project Serverless services...`));

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'serverless.yml')) {

			try {
				exec(`cd ${dirpath} && sls info && cd ${dir}`, {
					stdio: [0,1,2]
				});
			}
			catch (err) {
				console.log(chalk.red(`* info: Something went wrong with 'sls info' service at ${dirpath}. It might be nothing, so make sure to check your Serverless logs. Moving on...`));
			}
			
			count++;

		}

	});

	console.log(chalk.green(`* info: Displayed info on ${count} Serverless services.`));

};