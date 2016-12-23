'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Create crud resource`, note: `for all services` };
	}

	if (args[3]) {
		var name = utils.safeString(args[3]);
	}
	else {
		console.log(chalk.red('! create-crud: Please specify the name of your resource...'));
		process.exit();
	}

	var path = args[4] ? utils.safeString(args[4]) : name;

	var sourceFilepath = `${__dirname}/create-crud`;
	var targetFilepath = `${process.env.PWD}/${name}`;

	console.log(chalk.yellow(`* create-crud: Creating new CRUD resource '${name}'...`));

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `sed -i '' 's:SLS_HQ_NAME:${name}:g' serverless.yml && `
		+ `sed -i '' 's:SLS_HQ_PATH:${path}:g' serverless.yml && `
		+ `npm install && cd ${process.env.PWD}`, {
			stdio: []
		});

	console.log(chalk.green(`* create-crud: Created new CRUD resource '${name}'.`));

	require('./ensure-shared.js')(args);

	console.log(chalk.yellow(`* create-crud: Creating database models for new CRUD resource '${name}'...`));

	var dbDriver = args[5] ? utils.safeString(args[5]) : 'DynamoDB';

	require(`./create-${dbDriver}-model.js`)(args);

	console.log(chalk.green(`* create-crud: Created database models for new CRUD resource '${name}'.`));

	console.log(chalk.yellow(`* create-crud: Modifying config.yml with ${dbDriver} model table name...`));

	utils.appendLineToFile(`${name}DynamoDbTable: ` + '${self:appPrefix}-' + name, `${process.env.PWD}/shared/config.yml`);

	console.log(chalk.green(`* create-crud: Modified config.yml with ${dbDriver} model table name.`));

};