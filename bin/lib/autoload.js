'use strict';

var fs = require('fs');

var path = require('path');

var _ = require('underscore');

var autoload = (dirpath) => {

	var items = {};

	_.each(fs.readdirSync(dirpath), function(item) {

		var extname = path.extname(item);

		var basename = path.basename(item, extname);

		var filepath = `${dirpath}/${item}`;

		var stat = fs.lstatSync(filepath);

		if (stat.isDirectory()) {

			items[basename] = require(filepath);

		}

	});

	return items;

};

/*
First load our utils, since they do not depend on anything.
They are truly the smallest unit.
*/

var utils = autoload(`${__dirname}/utils`);

/*
Also grab out aws, which is a wrapper around the aws-sdk. 
We wrap around this to handle offline usage, dynamically 
loading credentials via AWS credentials profile specified
in your project.
*/

var aws = require(`${__dirname}/aws`);

/*
Then grab all of our models, not instantiated.
*/

var m = autoload(`${__dirname}/models`);

/*
Now, we go through all our models, and we instantiate each 
with all of our utils and uninstantated models. This then
gives each model full access to whatever shared resources 
it might need.
*/

var models = _.mapObject(m, function(module, name) {

	return module(aws, m, utils, name);

});

/*
Finally we return our resulting utils and models that get
exposed in our lib module.
*/

module.exports = { models, utils };
