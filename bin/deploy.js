'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Deploy`, 
			note: `for all services`,
			args: []
		};
	}

	console.log(chalk.yellow(`* deploy: Deploying all project Serverless services to AWS...`));

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'serverless.yml')) {

			try {
				exec(`cd ${dirpath} && sls deploy && cd ${dir}`, {
					stdio: [0,1,2]
				});
			}
			catch (err) {
				console.log(chalk.red(`* deploy: Something went wrong with deploying service at ${dirpath}. It might be nothing, so make sure to check your Serverless logs. Moving on...`));
			}
			
			count++;

		}

	});

	console.log(chalk.green(`* deploy: Deployed ${count} Serverless services to AWS.`));

};