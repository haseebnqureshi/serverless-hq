'use strict';

var exec = require('child_process').execSync;

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Remove project library`, note: `for all services` };
	}

	require('./unlink-shared.js')(args);

	exec(`rm -r ${process.env.PWD}/shared`);

	console.info(`* remove-shared: Removed shared library from project.`);

};