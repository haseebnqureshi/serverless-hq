'use strict';

var fs = require('fs');

var path = require('path');

var _ = require('underscore');

module.exports.dirpathHas = (dirpath, needle, hard) => {

	if (!this.isDir(dirpath)) { return false; }

	var containsNeedle = false;

	var files = fs.readdirSync(dirpath);

	_.each(files, function(file) {
		if (hard === true) {
			if (needle === file) { 
				containsNeedle = true;
			}
		}
		else {
			if (file.includes(needle)) {
				containsNeedle = true;
			}
		}
	});

	return containsNeedle;

};

module.exports.isDir = (filepath) => {

	var stat = fs.lstatSync(filepath);

	return stat.isDirectory();

};

module.exports.iterateDir = (dirpath, iteratee) => {

	_.each(fs.readdirSync(dirpath), function(file) {

		var filepath = path.resolve(dirpath, file);

		iteratee(filepath);

	});

};

module.exports.safeString = (str, delimeter, toLowerCase) => {

	if (!_.isString(delimeter)) {
		delimeter = '-';
	}

	if (toLowerCase !== false) {
		str = str.toLowerCase();
	}

	return str.replace(/[^a-z0-9\-\.]/gmi, delimeter);

};

