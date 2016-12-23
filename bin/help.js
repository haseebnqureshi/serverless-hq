'use strict';

var fs = require('fs');

var path = require('path');

var _ = require('underscore');

var chalk = require('chalk');

this.createCommandString = (command, description, indentDescription) => {
	var line = chalk.yellow(command + ' ');
	var difference = indentDescription - line.length;

	for (var i=0; i<difference; i++) {
		line += chalk.gray('.');
	}

	return line + ' ' + chalk.white(description || '');
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
		var description = require(filepath)(null, true);
	}
	catch (err) { return false; }
	return { name, description };
};

this.printAvailableCommands = () => {
	var that = this;
	this.getAvailableCommands(function(command) {
		var line = that.createCommandString(
			command.name,
			command.description || '',
			40
		);
		console.log(line);
	});
};

this.printFooter = () => {
	console.log(`\n`
		+ `\n` + chalk.gray.underline(`Crafted by HQ, 2016-2017`)
		+ `\n` + chalk.gray(`Twitter.com/_hq, GitHub.com/haseebnqureshi`)
		+ `\n` + chalk.gray(`Made in Knoxville, Tennessee`)
		+ `\n`
	);
};

this.printHeader = () => {
	console.log(`\n` + chalk.yellow.underline(`SERVERLESS HQ`)
		+ `\n` + chalk.yellow(`Serverless made quick & easy.`)
		+ `\n` + chalk.gray(`This is your home base for quick & powerfully easy scaffolding for your next Serverless project.`)
		+ `\n`
		+ `\n` + chalk.yellow.underline(`0.1.0 Commands`)
		+ `\n` + chalk.gray(`* You can run commands with "serverless-hq" or the shortcuts "sls-hq" or "slshq"`)
		+ `\n` + chalk.gray(`* Docs: github.com/haseebnqureshi/serverless-hq`)
		+ `\n`
	);
};

module.exports = (args) => {
	this.printHeader();
	this.printAvailableCommands();
	this.printFooter();
};