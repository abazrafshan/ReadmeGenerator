// Call required node methods
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
// Promisify writeFile function
const writeFileAsync = util.promisify(fs.writeFile);
// const generateMarkdown = require("./utils/generateMarkdown");

// Array of questions that are prompted as user is building readme
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

// Function that uses inquirer method to prompt user for input on content of readme, returns the data from user input
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

// Data is passed to this function and uses template literal to populate contents of readme
function generateMarkdown(data) {
    let lic = ``;
    const dataLicense = data.license;
    // Generate badge from user's license input
    if (dataLicense == "MIT"){
        lic = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    }
    else if (dataLicense == "APACHE 2.0"){
        lic = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
    }
    else if (dataLicense == "GPL 3.0"){
        lic = `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
    }
    else if (dataLicense == "BSD 3"){
        lic =`[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`
    }
    else {
        lic = `No license selected`;
    }

    return `
# ${data.projectName}
  
${lic}
## Description
  
${data.description}
  
## Table of Contents
* [Install](#install)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
* [Links](#links)
  
## Install
  
Install dependencies for this application by running command:
  
    ${data.install}
  
## Usage
  
${data.info}
  
## License
  
Project is licensed under the following: ${data.license}
  
## Contributing
  
${data.contribute}
  
## Tests
  
The following test(s) can be used to verify functionality: 
  
    ${data.test}
## Questions
If you have any questions about the repo, open an issue or contact [${data.username}] directly at ${data.email}
## Links
Link to deployed application: ${data.projectURL}
Link to Github repo: (https://github.com/${data.username}/${data.projectName})
  
`;}
 
// User is first prompted for input from inquirer method and this data is passed into another function
promptUser().then(function(answers){
    // inquirer data used in generateMarkdown function to construct readme file 
    const content = generateMarkdown(answers);
    // Function returns writeFile method to write the readme document  
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