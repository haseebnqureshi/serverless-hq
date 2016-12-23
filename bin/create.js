'use strict';

var exec = require('child_process').execSync;

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Create blank serverless nodejs template`, note: `` };
	}

	var path = args[3];
	if (!path) {
		console.error('! create: Please specify the path of your new Serverless service template...');
		process.exit();
	}

	exec(`sls create --template aws-nodejs --path ${path}`, {
		stdio: [0,1,2]
	});

	console.info(`* create: Created new Serverless service template at ${path}...`);

};