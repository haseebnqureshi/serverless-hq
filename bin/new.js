'use strict';

var exec = require('child_process').execSync;

module.exports = (args) => {

	var path = args[3];
	if (!path) {
		console.error('! new: Please specify the path of your new Serverless service template...');
		process.exit();
	}

	exec(`sls create --template aws-nodejs --path ${path}`);

	console.info(`* new: Created new Serverless service template at ${path}...`);

};