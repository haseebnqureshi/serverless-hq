
module.exports = (Config) => {

	return {

		/* this is where you explicitly define what's in your Lib.Utils object */
	
		API: require('./API.js')(Config),

		AWS: require('./AWS.js')(Config)

		/* stop defining here */

	};

};