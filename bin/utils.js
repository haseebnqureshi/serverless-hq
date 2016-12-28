'use strict';

var fs = require('fs');

var path = require('path');

var _ = require('underscore');

module.exports.appendLineToFile = (line, filepath) => {

	fs.appendFileSync(filepath, `\n${line}`, 'utf8');

};

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

module.exports.fileContainsString = (filepath, needle) => {

	var contents = fs.readFileSync(filepath, 'utf8');

	return contents.match(needle);

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

module.exports.safeString = (str, delimeter, toLowerCase, capitalizeFirstChar) => {

	if (!_.isString(delimeter)) {
		delimeter = '-';
	}

	if (toLowerCase !== false) {
		str = str.toLowerCase();
	}

	if (capitalizeFirstChar === true) {
		str = str.charAt(0).toUpperCase() + str.slice(1);
	}

	return str.replace(/[^a-z0-9\-\.]/gmi, delimeter);

};

