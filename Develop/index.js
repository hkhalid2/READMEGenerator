// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');


const questions  = () => {
    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the Project's title?",
      },

      {
        type: "input",
        name: "description",
        message: "What is the Project's description?",
      },

      {
        type: "input",
        name: "installation",
        message: "What are the Project's installation instructions?",
      },

      {
        type: "input",
        name: "usage",
        message: "What is the Project's usage information?",
      },

      {
        type: 'list',
        name: 'license',
        message: 'Pick a license',
        choices: [
         'MIT License',
         'Apache License 2.0',
         'The Unlicense',
         'Mozilla Public License 2.0',
         'Boost Software License 1.0'
        ],
        initial: 1
      },

      {
        type: "input",
        name: "contribution",
        message: "What are the Project's contribution guidelines?",
      },

      {
        type: "input",
        name: "test",
        message: "What are the Project's test instructions?",
      },

      {
        type: "input",
        name: "github",
        message: "What is the your Github profile username?",
      },

      {
        type: "input",
        name: "email",
        message: "What is your email address?",
      },
    
    ]);
  };;


// uses promises to create writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

const generateREADME = (answers) =>
`# ${answers.title}

## Table of Contents
* [Description](#Description)
* [Installation](#Installation)
* [Usage Information](#Usage-Information)
* [License](#License)
* [Contribution Guidelines](#Contribution-Guidelines)
* [Questions](#Questions)

## Description
${answers.description}

## Installation
\`\`\`
${answers.installation}
\`\`\`

## Usage Information
\`\`\`
${answers.usage}
\`\`\`

## License
\`\`\`
${answers.license}
\`\`\`

## Contribution Guidelines
${answers.contribution}

## Questions
Github: https://github.com/${answers.github}  
For additional questions email : ${answers.email}`;

// TODO: Create a function to initialize app
const init = () => {
    questions()
      .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
      .then(() => console.log('Successfully wrote to README.md'))
      .catch((err) => console.error(err));
  };

// Function call to initialize app
init();
