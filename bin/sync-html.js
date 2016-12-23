'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var path = require('path');

var chalk = require('chalk');

this.sync = (resourceFilepath, doneFilepath) => {

	return exec(`cd ${resourceFilepath} && sls invoke local -f sync && cd ${doneFilepath}`, {
		stdio: [0,1,2]
	});

};

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Update static html websites`, note: `for all resources` };
	}

	if (args[3]) {
		var name = utils.safeString(args[3]);
	}
	else {
		console.log(chalk.red('! sync-html: Please specify the name of your resource...'));
		process.exit();
	}

	if (name === 'all') {

		console.log(chalk.yellow(`* sync-html: Syncing all available HTML resources with AWS...`));

		var count = 0;

		var dir = process.env.PWD;

		utils.iterateDir(dir, function(dirpath) {

			if (utils.dirpathHas(dirpath, 'serverless.yml')) {

				if (utils.fileContainsString(`{$dirpath}/serverless.yml`, 'sync:')) {

					console.log(chalk.yellow(`* sync-html: Syncing HTML resources '${dirpath}' with AWS...`));

					this.sync(dirpath, dir);

					console.log(chalk.green(`* sync-html: Synced HTML resource '${name}' with AWS.`));

					count++;

				}
				
			}

		});

		console.log(chalk.green(`* sync-html: Sycned ${count} available HTML resources with AWS.`));

	}

	else {

		console.log(chalk.yellow(`* sync-html: Syncing HTML resource '${name}' with AWS...`));

		this.sync(`${__dirname}/${name}`, __dirname);

		console.log(chalk.green(`* sync-html: Synced HTML resource '${name}' with AWS.`));

	}

};