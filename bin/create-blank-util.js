'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Create blank utility resource`, note: `for all services` };
	}

	if (args[3]) {
		var name = utils.safeString(args[3], '', false);
	}
	else {
		console.log(chalk.red('! create-blank-util: Please specify the name of your resource...'));
		process.exit();
	}

	require('./ensure-shared.js')(args);

	var sourceFilepath = `${__dirname}/create-blank-util`;
	
	var targetFilepath = `${process.env.PWD}/shared/Utils/${name}`;

	console.log(chalk.yellow(`* create-blank-util: Creating new util resource '${name}'...`));

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `npm install && cd ${process.env.PWD}`);

	console.log(chalk.green(`* create-blank-util: Created new util resource '${name}'.`));

};