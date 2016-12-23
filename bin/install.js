'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

module.exports = (args, returnDescription) => {

	if (returnDescription) {
		return 'Create your new Serverless service nodejs template';
	}

	console.info(`* install: Installing NPM scripts for all project top-level directories...`);

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'package.json')) {

			exec(`cd ${dirpath} && npm install && cd ${dir}`);
			
			count++;

		}

	});

	console.info(`* install: Installed NPM scripts for ${count} top-level directories.`);

};