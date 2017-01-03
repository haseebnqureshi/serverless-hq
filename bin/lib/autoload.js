'use strict';

var fs = require('fs');

var _ = require('underscore');

var autoload = (dirpath) => {

	var items = [];

	_.each(fs.readdirSync(dirpath), function(item) {

		var filepath = `${dirpath}/${item}`;

		var stat = fs.lstatSync(filepath);

		if (stat.isDirectory()) {

			items.push(filepath);
			
		}

	});

	return items;

};

module.exports = { 

	Models: autoload(`${__dirname}/Models`), 

	Utils: autoload(`${__dirname}/Utils`)

};
