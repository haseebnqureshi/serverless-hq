'use strict';

var exec = require('child_process').execSync;

var path = require('path');

var fs = require('fs');

var utils = require('./utils.js');

module.exports = (args) => {

	console.info(`* ensure-shared: Ensuring shared library exists...`);

	var dirpath = path.resolve(process.env.PWD, 'shared');

	try {
		fs.accessSync(dirpath)
	}
	catch (err) {
		require('./create-shared.js')(args);
	}

	console.log(`* ensure-shared: Ensured shared library exists.`);

	require('./use-shared.js')(args);

};