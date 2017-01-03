'use strict';

module.exports = (Config) => {

	var Util = {};

	Util.sayHello = (name) => {
		console.log(`Hello, ${name}!`);
	};

	return Util;
};