'use strict';

var _  = require('underscore');

var fs = require('fs');

var yaml = require('js-yaml');

var path = require('path');

this.getConfig = (dirpath, filename) => {

	var filepath = path.resolve(dirpath, filename || 'config.yml');

	try {
		fs.accessSync(filepath);
	}
	catch (err) {
		return {};
	}

	var configYml = fs.readFileSync(filepath, 'utf8');

	var config;

	try {
		config = yaml.safeLoad(configYml);
	}
	catch (err) {
		return {};
	}

	return config; 

};

module.exports = (sharedAppDir) => {

	var Config = this.getConfig(sharedAppDir);

	Config.Local = this.getConfig(process.env.LAMBDA_TASK_ROOT || process.env.PWD);

	process.env = _.extend(process.env, Config);

	return Config;

};
