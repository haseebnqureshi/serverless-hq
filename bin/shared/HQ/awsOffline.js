'use strict';

/*
With serverless-offline, you'll need to use your AWS credentials
and pass them into your AWS.config. Otherwise, resources like 
DynamoDb won't work in your code, since it still relies on the 
AWS hosted resources.

So we've shoved that entire process in this module :)
*/

module.exports = (Config) => {

	var _ = require('underscore');

	var fs = require('fs');

	var path = require('path');

	var exec = require('child_process').execSync;

	var localCredFilepath = '~/.aws/credentials';

	var profiles = {};

	var contents = exec(`cat ${localCredFilepath}`, { encoding: 'utf8' });

	_.each(contents.split(/\n\n/), function(group) {
		var lines = group.split(/\n/);
		var profileLine = lines.shift();
		var profileKey = profileLine.replace(/[\[\]]+/g, '');
		profiles[profileKey] = {};

		_.each(lines, function(line) {
			var parts = line.split(/\s?\=\s?/);
			var key = parts[0];
			var value = parts[1];
			profiles[profileKey][key] = value;
		});

	});

	var AWS = require('aws-sdk');

	AWS.config.update({
		region: Config.awsRegion,
		accessKeyId: profiles[Config.awsProfile].aws_access_key_id,
		secretAccessKey: profiles[Config.awsProfile].aws_secret_access_key
	});

	return AWS;

};
