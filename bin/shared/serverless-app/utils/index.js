'use strict';

var fs = require('fs');

var _ = require('underscore');

var items = [];

_.each(fs.readdirSync(__dirname), function(item) {

	var filepath = `${__dirname}/${item}`;

	var stat = fs.lstatSync(filepath);

	if (stat.isDirectory()) {

		items.push(filepath);
	}

});

module.exports = items;
