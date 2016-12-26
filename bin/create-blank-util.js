'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var path = require('path');

var shared = require('./shared');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Create blank utility resource`, 
			note: `for all services`,
			args: [
				{ name: 'name', required: true }
			]
		};
	}

	if (args[3]) {
		var name = utils.safeString(args[3]);
	}
	else {
		console.log(chalk.red('! create-blank-util: Please specify the name of your resource...'));
		process.exit();
	}

	require('./ensure-shared.js')(args);

	var sourceFilepath = path.resolve(__dirname, 'create-blank-util');

	var targetFilepath = path.resolve(process.env.PWD, shared.dirname, shared.appDirname, shared.appUtilsDirname, name);

	console.log(chalk.yellow(`* create-blank-util: Creating new util resource '${name}'...`));

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `npm install && cd ${process.env.PWD}`, {
			stdio: []
		});

	console.log(chalk.green(`* create-blank-util: Created new util resource '${name}'.`));

};