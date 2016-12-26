'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var path = require('path');

var chalk = require('chalk');

this.sync = (resourceFilepath, doneFilepath, name) => {

	return exec(`cd ${resourceFilepath} && sls invoke local -f sync && cd ${doneFilepath}`, {
		stdio: [0,1,2]
	});

};

this.beforeSync = (resourceFilepath, doneFilepath, name) => {

	var success = false;

	if (utils.dirpathHas(resourceFilepath, 'serverless.yml')) {

		if (utils.fileContainsString(`${resourceFilepath}/serverless.yml`, 'sync:')) {

			console.log(chalk.yellow(`* sync-html: Syncing HTML resources '${resourceFilepath}' with AWS...`));

			this.sync(resourceFilepath, doneFilepath, name);

			console.log(chalk.green(`* sync-html: Synced HTML resource '${name}' with AWS.`));

			success = true;

		}
		
	}

	return success;

};

module.exports = (args, returnInfo) => {

	var that = this;

	if (returnInfo) {
		return { 
			info: `Update static html websites`, 
			note: `for all resources`,
			args: [
				{ name: 'name | all', required: true }
			]
		};
	}

	if (args[3]) {
		var name = utils.safeString(args[3]);
	}
	else {
		console.log(chalk.red(`! sync-html: Please specify the name of your resource ('all' for all HTML resources)...`));
		process.exit();
	}

	var doneFilepath = process.env.PWD;

	if (name !== 'all') {

		var resourceFilepath = path.resolve(process.env.PWD, name);

		this.beforeSync(resourceFilepath, doneFilepath, name);

	}

	else {

		var count = 0;

		utils.iterateDir(doneFilepath, function(resourceFilename) {

			var name = path.basename(resourceFilename);

			var resourceFilepath = path.resolve(doneFilepath, resourceFilename);

			var success = that.beforeSync(resourceFilepath, doneFilepath, name);

			if (success) {
				count++;
			}
	
		});

		console.log(chalk.green(`* sync-html: Sycned ${count} available HTML resources with AWS.`));

	}

};