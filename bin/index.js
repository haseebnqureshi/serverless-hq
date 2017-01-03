#! /usr/bin/env node

var _ = require('underscore');

var chalk = require('chalk');

var inquirer = require('inquirer');

console.log(
	  `\n` + chalk.gray(`| `) + chalk.yellow.bold(`SERVERLESS HQ`)
	+ `\n` + chalk.gray(`| `) + chalk.cyan.bold(`Serverless made quick & easy!`)
	+ `\n` + chalk.gray(`| `) + `This is your home base for quick & powerfully easy scaffolding`
	+ `\n` + chalk.gray(`| `) + `for your next Serverless project.`
	+ `\n` + chalk.gray(`| `) + chalk.gray(`Version 0.3.0`)
	+ `\n` + chalk.gray(`| `)
	+ `\n` + chalk.gray(`| `) + chalk.white(`crafted by hq (2016-2017)`)
	+ `\n` + chalk.gray(`| `) + chalk.gray(`twitter.com/_hq, github.com/haseebnqureshi`)
	+ `\n` + chalk.gray(`| `) + chalk.gray(`made in knoxville, tennessee`)
	+ `\n` + chalk.gray(`| `)
	+ `\n` + chalk.gray(`| `) + `Let's get started!`
	+ `\n` + chalk.gray(`| `) + chalk.gray(`Answer the prompts and in seconds, you'll be up and running.`)
	+ `\n`
);

var questions = [
	{ 
		name: "SLS_HQ_service",
		type: "input",
		message: chalk.cyan("Project Name:"),
		default: "serverless-hq",
		filter: function(str) {
			return str.toLowerCase();
		}
	},
	{ 
		name: "SLS_HQ_providerName",
		type: "input",
		message: chalk.yellow("  Provider:"),
		default: "aws"
	},
	{ 
		name: "SLS_HQ_providerRuntime",
		type: "input",
		message: chalk.yellow("  Runtime:"),
		default: "nodejs4.3"
	},
	{ 
		name: "SLS_HQ_providerProfile",
		type: "input",
		message: chalk.yellow("  AWS Profile:"),
		default: "default"
	},
	{ 
		name: "SLS_HQ_providerRegion",
		type: "input",
		message: chalk.yellow("  AWS Region:"),
		default: "us-east-1"
	},
	{ 
		name: "SLS_HQ_providerStage",
		type: "input",
		message: chalk.yellow("  AWS Stage:"),
		default: "dev"
	},
	{
		name: "createApi",
		type: "confirm",
		message: chalk.cyan("Scaffold API?"),
		default: true
	},
	{
		name: "apiResources",
		type: "input",
		message: chalk.yellow("  CRUD Resources (comma separated):"),
		default: 'Items, Lists, Users',
		filter: function(str) {
			return str;
		},
		when: function(answers) {
			return answers.createApi === true;
		}
	},
	{
		name: "createHtml",
		type: "confirm",
		message: chalk.cyan("Scaffold HTML Website?"),
		default: true
	},
	{
		name: "htmlBucketName",
		type: "input",
		message: chalk.yellow("  S3 BucketName:"),
		default: 'serverless-hq.com',
		filter: function(str) {
			return str.toLowerCase();
		},
		when: function(answers) {
			return answers.createHtml === true;
		}
	},
	{
		name: "htmlForceNonWww",
		type: "confirm",
		message: function(answers) {
			return chalk.yellow(`  Redirect www.${answers.htmlBucketName} to ${answers.htmlBucketName}?`);
		},
		default: true,
		when: function(answers) {
			return answers.html === true;
		}
	},

];

inquirer.prompt(questions).then((answers) => {

	console.log(
		  `\n` + chalk.gray(`| `)
		+ `\n` + chalk.gray(`| `) + chalk.green.bold(`Okay!`)
		+ `\n` + chalk.gray(`| `) + chalk.gray.bold(`Scaffolding your project now...`)
		+ `\n` + chalk.gray(`| `)
	);

	console.log(answers);

});
