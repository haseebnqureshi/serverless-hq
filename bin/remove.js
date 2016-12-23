'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Remove from aws`, note: `for all services` };
	}

	console.info(`* remove: Removing all project Serverless services from AWS...`);

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

	console.log(`* remove: Removing ${count} Serverless services from AWS.`);

};