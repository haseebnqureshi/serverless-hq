'use strict';

var exec = require('child_process').execSync;

module.exports = (args) => {

	require('./install.js')(args);

	exec(`cp -r ${__dirname}/shared ${process.env.PWD}/shared &&`
		+ `cd ${process.env.PWD}/shared && npm link && cd ${process.env.PWD}`, {
		stdio: [0,1,2]
	});

	console.info(`* create-shared: Created shared library for all Serverless services...`);

};