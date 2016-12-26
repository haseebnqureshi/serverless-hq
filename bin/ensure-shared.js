'use strict';

var exec = require('child_process').execSync;

var shared = require('./shared');

var utils = require('./utils.js');

var path = require('path');

var fs = require('fs');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Ensure project library`, 
			note: `for all services`,
			args: []
		};
	}

	console.log(chalk.yellow(`* ensure-shared: Ensuring shared library exists...`));

	var targetFilepath = path.resolve(process.env.PWD, shared.dirname);

	try {
		fs.accessSync(targetFilepath)
	}
	catch (err) {
		require('./create-shared.js')(args);
	}

	console.log(chalk.green(`* ensure-shared: Ensured shared library exists.`));

	require('./use-shared.js')(args);

};