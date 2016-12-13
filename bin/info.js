'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

module.exports = (args) => {

	console.info(`* info: Displaying info on all project Serverless services...`);

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'serverless.yml')) {

			exec(`cd ${dirpath} && sls info && cd ${dir}`, {
				stdio: [0,1,2]
			});
			
			count++;

		}

	});

	console.log(`* info: Displayed info on ${count} Serverless services.`);

};