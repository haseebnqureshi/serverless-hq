'use strict';

var exec = require('child_process').execSync;

module.exports = (args) => {

	require('./unlink-shared.js')(args);

	exec(`rm -r ${process.env.PWD}/shared`);

	console.info(`* remove-shared: Removed shared library from project.`);

};