'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Create dynamodb model`, note: `for all services` };
	}

	if (args[3]) {
		var name = utils.safeString(args[3]);
	}
	else {
		console.log(chalk.red('! create-dynamodb-model: Please specify the name of your resource...'));
		process.exit();
	}

	require('./ensure-shared.js')(args);

	var sourceFilepath = `${__dirname}/create-dynamodb-model`;
	var targetFilepath = `${process.env.PWD}/shared/Models/${name}`;

	console.log(chalk.yellow(`* create-dynamodb-model: Creating new DynamoDB model resource '${name}'...`));

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `npm install && cd ${process.env.PWD}`, {
			stdio: []
		});

	console.log(chalk.green(`* create-dynamodb-model: Created new DynamoDB model resource '${name}'.`));

};
