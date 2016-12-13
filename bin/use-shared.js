'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

module.exports = (args) => {

	console.info(`* use-shared: Ensuring access to shared library by all Serverless services...`);

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'serverless.yml')) {

			exec(`cd ${dirpath} && npm link shared && cd ${dir}`);
			
			count++;

		}

	});

	console.log(`* use-shared: Ensured access to shared library by ${count} Serverless services.`);

};