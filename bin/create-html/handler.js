'use strict';

var exec = require('child_process').execSync;

var path = require('path');

var yaml = require('js-yaml');

var fs = require('fs');

module.exports.sync = (event, context, callback) => {

	var siteFilesPath = path.resolve(__dirname, 'www');

	var projectConfigPath = path.resolve(__dirname, '../config.yml');

	var serviceConfigPath = path.resolve(__dirname, 'config.yml');

	var projectConfig;

	var serviceConfig;

	//safely load our configs
	try {
		projectConfig = yaml.safeLoad(fs.readFileSync(projectConfigPath, 'utf8'));
		serviceConfig = yaml.safeLoad(fs.readFileSync(serviceConfigPath, 'utf8'));
	}
	catch (err) {
		throw `Sorry, make sure you're invoking this function locally!`;
	}

	exec(`aws s3 sync ${siteFilesPath} s3://${serviceConfig.staticBucketName} --profile=${projectConfig.awsProfile}`);

};

module.exports.get = (event, context, callback) => {

	var indexPath = path.resolve(__dirname, 'www/index.html');
	var response = {
		statusCode: 200,
		body: fs.createReadStream(indexPath),
		headers: {
			"Content-Type": "text/html"
		}
	}

	return context.succeed(response);

};
