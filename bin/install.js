'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Recursively npm install`, note: `` };
	}

	console.log(chalk.yellow(`* install: Installing NPM scripts for all project top-level directories...`));

	var count = 0;

	var dir = process.env.PWD;

	utils.iterateDir(dir, function(dirpath) {

		if (utils.dirpathHas(dirpath, 'package.json')) {

			exec(`cd ${dirpath} && npm install && cd ${dir}`, {
				stdio: []
			});
			
			count++;

		}

	});

	console.log(chalk.green(`* install: Installed NPM scripts for ${count} top-level directories.`));

};