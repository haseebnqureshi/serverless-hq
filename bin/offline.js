'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Run offline`, 
			note: `for all services`,
			args: []
		};
	}

	console.log(chalk.yellow(`* offline: Attempitng to run all project Serverless services offline...`));

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'serverless.yml')) {

			exec(`cd ${dirpath} && sls offline && cd ${dir}`, {
				stdio: [0,1,1]
			});
			
			count++;

		}

	});

	console.log(chalk.green(`* offline: Running ${count} Serverless services offline.`));

};