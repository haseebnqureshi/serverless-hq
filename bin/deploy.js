'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

module.exports = (args) => {

	console.info(`* deploy: Deploying all project Serverless services to AWS...`);

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'serverless.yml')) {

			exec(`cd ${dirpath} && sls deploy && cd ${dir}`);
			
			count++;

		}

	});

	console.log(`* deploy: Deployed ${count} Serverless services to AWS.`);

};