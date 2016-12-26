'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Remove from aws`, 
			note: `for all services`,
			args: []
		};
	}

	console.log(chalk.yellow(`* remove: Removing all project Serverless services from AWS...`));

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'serverless.yml')) {

			try {
				exec(`cd ${dirpath} && sls remove && cd ${dir}`, {
					stdio: [0,1,2]
				});				
			}
			catch (err) {
				console.log(chalk.cyan(`* info: Something went wrong with removing service at ${dirpath}. It might be nothing, so make sure to check your Serverless logs. Moving on...`));
			}
						
			count++;

		}

	});

	console.log(chalk.green(`* remove: Removed ${count} Serverless services from AWS.`));

};