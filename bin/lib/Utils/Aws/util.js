'use strict';

/*
AWS helpers to help feeding normal JS objects into AWS 
methods and classes.
*/

var _ = require('underscore');

module.exports.toAttributeUpdates = (keyValues) => {
	return _.mapObject(keyValues, function(val, key) {
		return {
			Action: 'PUT',
			Value: val
		}
	});
};
