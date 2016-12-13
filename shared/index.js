'use strict';

/*
Careful, this is opinionated! 

We believe a backend application ought to have multiple 
serverless functions, all sharing one library that 
manages data modeling and passes any helpers needed 
throughout the entire application.

To help with workflow and ease, this 'shared' library
auto-loads its contents, so long as they are valid
CommonJS modules that you find in NodeJS or NPM packages.

We load our 'shared' help3ers and direct inject them into 
our models herein, so you have full access. We then NPM
link (essentially rsync meets symlink) the entire 'shared'
directory and make it available in each of your 
serverless functions.

So again, this might not be for everyone, but this sure
as hell works for us.
*/

//first and foremost, we load our app's config
var Config = module.exports.Config = require('./Config');

//then since this is all Serverless, we load our AWS SDK
var AWS = module.exports.AWS = require('./AWS')(Config);

//then load our utils that aren't dependent on anything
var Utils = module.exports.Utils = require('./Utils')(Config);

//now load our models, which are completely dependent on AWS and Utils
module.exports.Models = require('./Models')(Config, AWS, Utils);
