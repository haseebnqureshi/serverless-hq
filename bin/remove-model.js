'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var path = require('path');

var fs = require('fs');

var shared = require('./shared');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Remove model resource`, 
			note: ``,
			args: [
				{ name: 'name', required: true }
			]
		};
	}

	if (args[3]) {
		var name = utils.safeString(args[3]);
	}
	else {
		console.log(chalk.red('! remove-model: Please specify the name of your resource...'));
		process.exit();
	}

	var targetFilepath = path.resolve(process.env.PWD, shared.dirname, shared.appDirname, shared.appModelsDirname, name);

	try {
		fs.accessSync(targetFilepath);
	}
	catch (err) {
		console.log(chalk.red(`! remove-model: Model resource '${name}' could not be found...`));
		process.exit();
	}

	console.log(chalk.yellow(`* remove-model: Removing model resource '${name}'...`));

	exec(`rm -r ${targetFilepath}`, {
		stdio: []
	});

	console.log(chalk.green(`* remove-model: Removed model resource '${name}'.`));

};