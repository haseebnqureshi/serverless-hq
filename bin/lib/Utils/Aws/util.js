'use strict';

/*
AWS helpers to help feeding normal JS objects into AWS 
methods and classes.
*/

var _ = require('underscore');

var Util = {

	toAttributeUpdates: function(keyValues) {
		return _.mapObject(keyValues, function(val, key) {
			return {
				Action: 'PUT',
				Value: val
			}
		});
	}

};

module.exports = Util;
