'use strict';

/*
AWS helpers to help feeding normal JS objects into AWS 
methods and classes.
*/

module.exports = (Config) => {

	var _ = require('underscore');

	var Util = {

		toAttributeUpdates: (keyValues) => {
			return _.mapObject(keyValues, function(val, key) {
				return {
					Action: 'PUT',
					Value: val
				}
			});
		}

	};

	return Util;

};
