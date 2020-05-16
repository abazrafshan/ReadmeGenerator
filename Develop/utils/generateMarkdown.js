

function generateMarkdown(data) {
  
  
  return `
# ${data.projectName}


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

module.exports = generateMarkdown;
