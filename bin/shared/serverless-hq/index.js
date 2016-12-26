'use strict';

var fs = require('fs');

var path = require('path');

var _ = require('underscore');

var sharedAppDir = path.resolve(__dirname, '../serverless-app');

var sharedAppModelsDir = `${sharedAppDir}/models`;

var sharedAppUtilsDir = `${sharedAppDir}/utils`;

this.requireModulesFromDir = (dir, argsArr, extendedObj) => {

	_.each(fs.readdirSync(dir), function(file) {

		var filepath = path.resolve(dir, file);

		try {
			
			var module = require(filepath).apply(this, argsArr);
			
			var key = module[0];
			
			extendedObj[key] = module[1];
		
		}
		
		catch (err) {};

	});

	return extendedObj;

};

/*
Load objects that come with serverless-hq, which include a
config loading script, AWS switching between offline and online
usage, and a set of utility methods.
*/

var Config = require('./config.js')(sharedAppDir);

var AWS = require('./aws.js')(Config);

var Utils = {

	API: require('./utilApi.js')(Config),

	AWS: require('./utilAws.js')(Config)

};

var Models = {};

/*
Now we extend all of those objects with anything our user has
specifically defined in their serverless-app directory, which
comes from our project's shared directory.

This allows us to have cleanly separated logic for our application,
while not trampling on anytihng that comes out-of-the-box with 
serverless-hq.
*/

Utils = this.requireModulesFromDir(sharedAppUtilsDir, [Config], Utils);

Models = this.requireModulesFromDir(sharedAppModelsDir,	[Config, AWS, Utils], Models);

/*
Finally, we take the resulting objects and return them into 
an object, keyed by their name used here.
*/

module.exports = { Config, AWS, Utils, Models };
