'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

var chalk = require('chalk');

module.exports = (args, returnInfo) => {

	if (returnInfo) {
		return { info: `Create static html website`, note: `hosted on s3` };
	}

	if (args[3]) {
		var name = utils.safeString(args[3]);
	}
	else {
		console.log(chalk.red('! create-html: Please specify the name of your resource...'));
		process.exit();
	}

	var staticBucketName = args[4] ? utils.safeString(args[4]) : 'serverless-hq.com';
	var path = args[5] ? utils.safeString(args[5]) : '/';

	var sourceFilepath = `${__dirname}/create-html`;
	var targetFilepath = `${process.env.PWD}/${name}`;

	console.log(chalk.yellow(`* create-html: Creating new HTML resource '${name}'...`));

	exec(`cp -r ${sourceFilepath} ${targetFilepath} && cd ${targetFilepath} && `
		+ `sed -i '' 's:SLS_HQ_NAME:${name}:g' serverless.yml && `
		+ `sed -i '' 's:SLS_HQ_PATH:${path}:g' serverless.yml && `
		+ `sed -i '' 's:SLS_HQ_STATICBUCKETNAME:${staticBucketName}:g' config.yml && `
		+ `npm install && cd ${process.env.PWD}`);

	console.log(chalk.green(`* create-html: Created new HTML resource '${name}'.`));

};