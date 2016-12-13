'use strict';

module.exports = (Config, AWS, Utils) => {

	return {

		/* DEFINE WHAT DATA MODELS YOU WANT INCLUDED IN MODELS */

		Items: require('./Items')(Config, AWS, Utils, 'items')

		/* stop defining here */

	};

};
