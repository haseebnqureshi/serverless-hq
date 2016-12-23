'use strict';

var exec = require('child_process').execSync;

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Create project library`, note: `for all services` };
	}

	require('./install.js')(args);

	exec(`cp -r ${__dirname}/shared ${process.env.PWD}/shared &&`
		+ `cd ${process.env.PWD}/shared && npm link && cd ${process.env.PWD}`);

	console.info(`* create-shared: Created shared library for all Serverless services...`);

};