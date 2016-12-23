'use strict';

var exec = require('child_process').execSync;

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Create blank serverless nodejs template`, note: `` };
	}

	var path = args[3];
	if (!path) {
		console.log(chalk.red('! create: Please specify the path of your new Serverless service template...'));
		process.exit();
	}

	console.log(chalk.yellow(`* create: Creating new Serverless service template at ${path}...`));

	exec(`sls create --template aws-nodejs --path ${path}`, {
		stdio: [0,1,2]
	});

	console.log(chalk.green(`* create: Created new Serverless service template at ${path}.`));

};