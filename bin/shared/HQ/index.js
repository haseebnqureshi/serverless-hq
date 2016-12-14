'use strict';

var fs = require('fs');

var path = require('path');

var _ = require('underscore');

var requireModulesFromDir = (dir, argsArr, obj) => {
	_.each(fs.readdirSync(dir), function(file) {
		var filepath = path.resolve(dir, file);
		try {
			var module = require(filepath).apply(this, argsArr);
			var key = module[0];
			obj[key] = module[1];
		}
		catch (err) {};
	});
	return obj;
};

//load objects that come with serverless-hq
var Config = require('./config.js');

var AWS = require('./AWS')(Config);

var Utils = {
	API: require('./utilApi.js')(Config),
	AWS: require('./utilAws.js')(Config)
};

var Models = {};

//now dynamically load objects specified by user in shared 
Utils = requireModulesFromDir(path.resolve(__dirname, '../Utils'), [Config], Utils);
Models = requireModulesFromDir(path.resolve(__dirname, '../Models'), [Config, AWS, Utils], Models);

//and return our final shared object
module.exports = {
	Config,
	AWS,
	Utils,
	Models
};
