'use strict';

var exec = require('child_process').execSync;

var path = require('path');

var siteFilesPath = path.resolve(__dirname, 'www');

module.exports.sync = (event, context, callback) => {

	// exec(`aws s3 sync ${siteFilesPath} s3://${Shared.Config.Local.staticBucketName} --profile=${Shared.Config.awsProfile}`);

};
