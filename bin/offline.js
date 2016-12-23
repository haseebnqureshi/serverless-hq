'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Run offline`, note: `for all services` };
	}

	console.info(`* offline: Running all project Serverless services offline...`);

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

	console.log(`* offline: Running ${count} Serverless services offline.`);

};