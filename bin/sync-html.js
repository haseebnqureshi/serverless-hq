'use strict';

var exec = require('child_process').execSync;

var utils = require('./utils.js');

module.exports = (args) => {

	var name = args[3];
	if (!name) {
		console.error('! sync-html: Please specify the name of your resource...');
		process.exit();
	}

	if (name === 'all') {
		console.info(`* sync-html: Syncing all available HTML resources with AWS...`);
	}
	else {

		console.info(`* sync-html: Syncing HTML resource '${name}' with AWS...`);

		exec(`cd ${__filename}/${name} && sls invoke local -f sync && cd ${__filename}`, {
			stdio: [0,1,2]
		});

		console.info(`* sync-html: Synced HTML resource '${name}' with AWS.`);

	}

};