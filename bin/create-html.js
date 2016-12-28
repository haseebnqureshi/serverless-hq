'use strict';

var exec = require('child_process').execSync;

var fs = require('fs');

var utils = require('./utils.js');

var shared = require('./shared');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { 
			info: `Create static html website`, 
			note: `hosted on s3`,
			args: [
				{ name: 'name', required: true },
				{ name: 'bucket-name', required: true },
				{ name: 'www', required: false }
			]
		};
	}

	if (args[3]) {
		var name = utils.safeString(args[3], '', true, true);
	}
	else {
		console.log(chalk.red('! create-html: Please specify the name of your resource...'));
		process.exit();
	}

	if (args[4]) {
		var staticBucketName = utils.safeString(args[4], '-', true, false);
	}
	else {
		console.log(chalk.red('! create-html: Please specify your S3 bucket name (\'domain.com\' or \'sub.domain.com\')...'));
		process.exit();
	}

	var whichServerless = 'serverless-redirect.yml';
	if (args[5]) {
		if (args[5] === 'no') {
			var whichServerless = 'serverless-noredirect.yml';
		}
	}

	var sharedAppDir = `node_modules/${shared.dirname}/${shared.appDirname}`;

	var sourceFilepath = `${__dirname}/create-html`;
	var targetFilepath = `${process.env.PWD}/${name}`;

	console.log(chalk.yellow(`* create-html: Creating new HTML resource '${name}'...`));

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `cp ${whichServerless} serverless.yml && `
		+ `rm serverless-*.yml && `
		+ `sed -i '' 's:SLS_HQ_NAME:${name}:g' serverless.yml && `
		+ `sed -i '' 's:SLS_HQ_SHARED_APP:${sharedAppDir}:g' serverless.yml && `
		+ `sed -i '' 's:SLS_HQ_STATICBUCKETNAME:${staticBucketName}:g' config.yml && `
		+ `npm install && cd ${process.env.PWD}`, {
			stdio: []
		});

	require('./ensure-shared.js')(args);

	console.log(chalk.green(`* create-html: Created new HTML resource '${name}'.`));

};