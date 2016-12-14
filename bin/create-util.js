'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

module.exports = (args) => {

	if (args[3]) {
		var name = utils.safeString(args[3], '', false);
	}
	else {
		console.error('! create-util: Please specify the name of your resource...');
		process.exit();
	}

	require('./ensure-shared.js')(args);

	var sourceFilepath = `${__dirname}/create-util`;
	var targetFilepath = `${process.env.PWD}/shared/Utils/${name}`;

	console.info(`* create-util: Creating new util resource '${name}'...`);

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `npm install && cd ${process.env.PWD}`);

	console.info(`* create-util: created new util resource '${name}'`);

};