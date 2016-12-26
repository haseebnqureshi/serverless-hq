'use strict';

var exec = require('child_process').execSync;

var path = require('path');

var yaml = require('js-yaml');

var Shared = require('shared');

var fs = require('fs');

var siteFilesPath = path.resolve(__dirname, 'www');

module.exports.sync = (event, context, callback) => {

	exec(`aws s3 sync ${siteFilesPath} s3://${Shared.Config.Local.staticBucketName} --profile=${Shared.Config.awsProfile}`);

};

module.exports.get = (event, context, callback) => {

	var indexPath = path.resolve(siteFilesPath, 'index.html');
	var response = {
		statusCode: 200,
		body: fs.createReadStream(indexPath),
		headers: {
			"Content-Type": "text/html"
		}
	}

	return context.succeed(response);

};
