'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Create blank model resource`, 
			note: `for all services`,
			args: [
				{ name: 'name', required: true }
			]
		};
	}

	if (args[3]) {
		var name = utils.safeString(args[3], '', false);
	}
	else {
		console.log(chalk.red('! create-blank-model: Please specify the name of your resource...'));
		process.exit();
	}

	require('./ensure-shared.js')(args);

	var sourceFilepath = `${__dirname}/create-blank-model`;
	var targetFilepath = `${process.env.PWD}/shared/Models/${name}`;

	console.log(chalk.yellow(`* create-blank-model: Creating new model resource '${name}'...`));

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `npm install && cd ${process.env.PWD}`, {
			stdio: []
		});

	console.log(chalk.green(`* create-blank-model: Created new model resource '${name}'.`));

};