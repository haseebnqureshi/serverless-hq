'use strict';

var fs = require('fs');

var path = require('path');

var _ = require('underscore');

var chalk = require('chalk');

this.createCommandString = (name, info, note, indentDescription) => {
	var line = chalk.yellow(name + ' ');
	var difference = indentDescription - line.length;

	for (var i=0; i<difference; i++) {
		line += chalk.gray('.');
	}

	line += chalk.white(` ${info}`);
	if (note) {
		line += chalk.cyan(` (${note})`);
	}
	return line;
};

this.getAvailableCommands = (iteratee) => {
	var that = this;
	var lines = [];
	_.each(fs.readdirSync(__dirname), function(file) {
		var filepath = `${__dirname}/${file}`;
		var command = that.loadCommand(filepath);
		if (!command) { return; }
		return iteratee(command);
	});
};

this.loadCommand = (filepath) => {
	var extname = path.extname(filepath);
	if (extname !== '.js') { return false; }
	var name = path.basename(filepath, extname);
	if (name === 'help') { return false; }
	try {
		var info = require(filepath)(null, true);
	}
	catch (err) { return false; }
	info.name = name;
	return info;
};

this.printAvailableCommands = () => {
	var that = this;
	this.getAvailableCommands(function(command) {
		var line = that.createCommandString(
			command.name,
			command.info || ``,
			command.note || ``,
			41
		);
		console.log(line);
	});
};

this.printFooter = () => {
	console.log(

`\n` + chalk.yellow.underline(`Strategy`)
// + `\n` + chalk.gray(`As outlined from Serverless Framework's founder Austen Collins on 
// Lambda Day 2016, you might want to use a monolithic pattern (maybe 
// with GraphQL), a nano-service pattern (one Lambda function for 
// each tightly focused purpose), or a micro-service pattern (one set 
// of a handful Lambda functions around one resource, like CRUD 
// operations).`)
// + `\n`
+ `\n` + chalk.white(`For SERVERLESS HQ, we prefer micro-services. This npm
package gives you super-easy commands to better manage a set of 
Serverless services, together forming your application.`)
+ `\n`
+ `\n` + chalk.yellow.underline(`Crafted by HQ, 2016-2017`)
+ `\n` + chalk.gray(`Twitter.com/_hq, GitHub.com/haseebnqureshi`)
+ `\n` + chalk.gray(`Made in Knoxville, Tennessee`)
+ `\n`

	);
};

this.printHeader = () => {
	console.log(`\n` + chalk.yellow.underline(`SERVERLESS HQ`)
		+ `\n` + chalk.yellow(`Serverless made quick & easy.`)
		+ `\n` + chalk.white(`This is your home base for quick & powerfully easy scaffolding 
for your next Serverless project.`)
		+ `\n`
		+ `\n` + chalk.yellow.underline(`0.1.0 Commands`)
		+ `\n` + chalk.gray(`* You can run commands with "serverless-hq" or the shortcuts "sls-hq" or "slshq"`)
		+ `\n`
	);
};

module.exports = (args) => {
	this.printHeader();
	this.printAvailableCommands();
	this.printFooter();
};