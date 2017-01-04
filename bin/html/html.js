'use strict';

var exec = require('child_process').execSync;

var path = require('path');

module.exports.sync = (event, context, callback) => {

	var siteFilesPath = path.resolve(__dirname, 'www');
	
	exec(`aws s3 sync ${siteFilesPath} s3://${process.env.HTML_BUCKET_NAME} --profile=${process.env.PROVIDER_PROFILE}`, {
		stdio: [0,1,2]
	});

};
