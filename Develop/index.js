// Prompt user with list of questions through inquirer 
// and save each response
// responses will be used in GenerateMarkdown where
// template literal will be used to populate Readme
// based on user feedback to each question
// WritetoFile function will take generateMarkdown content
// and write this file to a named readme.md

const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [
"What is the your Github username?",
"What is your email?",
"What is the URL to your project",
"What is the name of the project?",
"Please provide a brief description of your project",
"What kind of license should your project have?",
"What command should be run to install dependencies?",
"What command should be run to run tests",
"What does the user need to know about using the repo?",
"What does the user need to know about contributing to the repo?"
];

function writeToFile(fileName, data) {
}

function init() {

}

init();
