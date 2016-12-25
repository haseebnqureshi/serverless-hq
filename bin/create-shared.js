'use strict';

var exec = require('child_process').execSync;

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Create project library`, 
			note: `for all services`,
			args: []
		};
	}

	require('./install.js')(args);

	console.log(chalk.yellow(`* create-shared: Creating shared library for all Serverless services...`));

	exec(`cp -r ${__dirname}/shared ${process.env.PWD}/shared &&`
		+ `cd ${process.env.PWD}/shared && npm link && cd ${process.env.PWD}`, {
			stdio: []
		});

	console.log(chalk.green(`* create-shared: Created shared library for all Serverless services.`));

};