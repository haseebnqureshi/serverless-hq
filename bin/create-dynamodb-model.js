'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var path = require('path');

var shared = require('./shared');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Create dynamodb model`, 
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
		console.log(chalk.red('! create-dynamodb-model: Please specify the name of your resource...'));
		process.exit();
	}

	require('./ensure-shared.js')(args);

	var sourceFilepath = path.resolve(__dirname, 'create-dynamodb-model');

	var targetFilepath = path.resolve(process.env.PWD, shared.dirname, shared.appDirname, shared.appModelsDirname, name);

	console.log(chalk.yellow(`* create-dynamodb-model: Creating new DynamoDB model resource '${name}'...`));

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `sed -i '' 's:SLS_HQ_NAME:${name}:g' index.js && `
		+ `npm install && cd ${process.env.PWD}`, {
			stdio: []
		});

	console.log(chalk.green(`* create-dynamodb-model: Created new DynamoDB model resource '${name}'.`));

	console.log(chalk.yellow(`* create-dynamodb-model: Modifying config.yml with DynamoDB model table name...`));

	var configFilepath = path.resolve(process.env.PWD, shared.dirname, shared.appDirname, 'config.yml');

	utils.appendLineToFile(`${name}DynamoDbTable: ` + '${self:appPrefix}-' + name, configFilepath);

	console.log(chalk.green(`* create-dynamodb-model: Modified config.yml with DynamoDB model table name.`));

};
