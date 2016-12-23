'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Deploy`, note: `for all services` };
	}

	console.log(chalk.yellow(`* deploy: Deploying all project Serverless services to AWS...`));

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'serverless.yml')) {

			exec(`cd ${dirpath} && sls deploy && cd ${dir}`, {
				stdio: [0,1,2]
			});
			
			count++;

		}

	});

	console.log(chalk.green(`* deploy: Deployed ${count} Serverless services to AWS.`));

};