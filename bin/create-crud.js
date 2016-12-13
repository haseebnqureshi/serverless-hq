'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

module.exports = (args) => {

	if (args[3]) {
		var name = utils.safeString(args[3]);
	}
	else {
		console.error('! create-crud: Please specify the name of your resource...');
		process.exit();
	}

	var path = args[4] ? utils.safeString(args[4]) : name;

	var sourceFilepath = `${__dirname}/create-crud`;
	var targetFilepath = `${process.env.PWD}/${name}`;

	console.info(`* create-crud: Creating new CRUD resource '${name}'...`);

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `sed -i '' 's:SLS_HQ_NAME:${name}:g' serverless.yml && `
		+ `sed -i '' 's:SLS_HQ_PATH:${path}:g' serverless.yml && `
		+ `npm install && cd ${process.env.PWD}`, {
		stdio: [0,1,2]
	});

	console.info(`* create-crud: created new CRUD resource '${name}'`);

	require('./ensure-shared.js')(args);

};