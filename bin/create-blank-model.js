'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

module.exports = (args, returnDescription) => {

	if (returnDescription) {
		return 'Create your new Serverless service nodejs template';
	}

	if (args[3]) {
		var name = utils.safeString(args[3], '', false);
	}
	else {
		console.error('! create-model: Please specify the name of your resource...');
		process.exit();
	}

	require('./ensure-shared.js')(args);

	var sourceFilepath = `${__dirname}/create-model`;
	var targetFilepath = `${process.env.PWD}/shared/Models/${name}`;

	console.info(`* create-model: Creating new model resource '${name}'...`);

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `npm install && cd ${process.env.PWD}`);

	console.info(`* create-model: created new model resource '${name}'`);

};