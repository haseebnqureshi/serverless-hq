'use strict';

var exec = require('child_process').execSync;

module.exports = (args, returnDescription) => {

	if (returnDescription) {
		return 'Create your new Serverless service nodejs template';
	}

	require('./unlink-shared.js')(args);

	exec(`rm -r ${process.env.PWD}/shared`);

	console.info(`* remove-shared: Removed shared library from project.`);

};