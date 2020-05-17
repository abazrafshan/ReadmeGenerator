const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
// const generateMarkdown = require("./utils/generateMarkdown");
const writeFileAsync = util.promisify(fs.writeFile);

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

function promptUser(){
    return inquirer.prompt([
        {
            type: "input",
            message: questions[0],
            name: "username"
        },
        {
            type: "input",
            message: questions[1],
            name: "email"
        },
        {
            type: "input",
            message: questions[2],
            name: "projectURL"
        },
        {
            type: "input",
            message: questions[3],
            name: "projectName"
        },
        {
            type: "input",
            message: questions[4],
            name: "description"
        },
        {
            type: "list",
            message: questions[5],
            name: "license",
            choices: [
                "MIT",
                "APACHE 2.0",
                "GPL 3.0",
                "BSD 3",
                "None"
            ]
        },
        {
            type: "input",
            message: questions[6],
            name: "install"
        },
        {
            type: "input",
            message: questions[7],
            name: "test"
        },
        {
            type: "input",
            message: questions[8],
            name: "info"
        },
        {
            type: "input",
            message: questions[9],
            name: "contribute"
        }
    ]);
}

// async function writeToFile(fileName, data) {
//     const content = await generateMarkdown.generateMarkdown(data);
//     await writeFileAsync(fileName, content, function(err){
//         if (err){
//             return console.log(err);
//         }
//             console.log("success");
//         });
// }

// async function writeToFile(fileName, data) {
//     try{
//     const content = await generateMarkdown.generateMarkdown(data);
//     await writeFileAsync(fileName, content);
//         console.log("success");
// } catch(err)
// {
//     console.log(err);
// }};



// async function init() {
//     try{
//         await promptUser();
    
//     await writeToFile("readme.md",content);
//     console.log("success");

//     } catch(err) {
//         console.log(err);
//     }
// };

// init();

function generateMarkdown(data) {
    return `
  # ${data.projectName}
  
  ${data.username}
  
  
  ## Description
  
  ${data.description}
  
  The deployed application can be found at ${data.projectURL}
  
  ## Table of Contents
  * Title
  * Description
  * Install
  * Usage
  * License
  * Contributing
  * Tests
  * Questions
  
  ## Install
  
  Install dependencies for this application by running command ${data.install}
  
  ## Usage
  
  ${data.info}
  
  ## License
  
  Project is licensed under the following: ${data.license}
  
  ## Badges
  
  
  
  ## Contributing
  
  ${data.contribute}
  
  ## Tests
  
  The following test(s) can be used to verify functionality: ${data.test}
  
  `;
  }
  
promptUser().then(function(answers){
    const content = generateMarkdown(answers);
    return fs.writeFile("readme.md",content,function(err){
        if (err){
            return console.log(err);
        }
        console.log("success");
    });
}).then(function(){
    console.log("success");
}).catch(function(err){
    console.log(err);
});