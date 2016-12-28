'use strict';

/*
Let's also capture key paths related to our shared directory
and return that information, for any of our comamnds to use.
*/

var path = require('path');

var dirname = path.basename(path.resolve(__dirname, '..'));

var appDirname = 'serverless-app';

var appModelsDirname = 'models';

var appUtilsDirname = 'utils';

var Shared = { dirname, appDirname, appUtilsDirname, appModelsDirname };

/*
If we see this module is run in our bin, we assume it's being
called by our sls-hq commands. Therefore, we return information 
on our shared lib and avoid executing any more of this module.
*/

if (__dirname.match(/node_modules\/serverless-hq\/bin/)) {
	module.exports = Shared;
	return;
}

/*
If we make it to this point, we're assumign our shared library
is running during an app's execution. We now evaluate this module
in its entirety.
*/

var fs = require('fs');

var _ = require('underscore');

var exec = require('child_process').execSync;

this.requireModulesFromDir = (filepaths, argsArr, extendedObj) => {

	_.each(filepaths, function(filepath) {

		try {
			
			var module = require(filepath).apply(this, argsArr);

			var extname = path.extname(filepath);
			
			var key = path.basename(filepath, extname);
			
			extendedObj[key] = module;
				
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

var sharedAppDir = path.resolve(__dirname, '..', appDirname);

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

var utilPaths = require(path.resolve(sharedAppDir, appUtilsDirname));

var modelPaths = require(path.resolve(sharedAppDir, appModelsDirname));

Utils = this.requireModulesFromDir(utilPaths, [Config], Utils);

Models = this.requireModulesFromDir(modelPaths, [Config, AWS, Utils], Models);

/*
Finally, we take the resulting objects and return them into 
an object, keyed by their name used here.
*/

module.exports = { Config, AWS, Utils, Models, Shared };
