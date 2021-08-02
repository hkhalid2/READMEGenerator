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
        message: 'Which license do you need?',
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
    
    ])

  };

const licenseprops = (answers) => {
        if (answers.license === 'MIT License') {
            answers.symbol = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            answers.info = "blah";
        }
        else if (answers.license === 'Apache License 2.0') {
            answers.symbol = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            answers.info = "blah";
        }
        else if (answers.license === 'The Unlicense') {
            answers.symbol = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
            answers.info = "blah";
        }
        else if (answers.license === 'Mozilla Public License 2.0') {
            answers.symbol = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            answers.info = "blah";
        }
        else {
            answers.license.symbol = "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
            answers.license.info = "blah";
        }
        return answers;
};


// uses promises to create writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

const generateREADME = (answers) =>
`${answers.symbol}
# ${answers.title}

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
${answers.info}
\`\`\`

## Contribution Guidelines
${answers.contribution}

## Questions
Github: https://github.com/${answers.github}  
For additional questions email : ${answers.email}`;

// TODO: Create a function to initialize app
const init = () => {
    questions()
      .then((answers) => licenseprops(answers))
      .then((response) => writeFileAsync('README.md', generateREADME(response)))
      .then(() => console.log('Successfully wrote to README.md'))
      .catch((err) => console.error(err));
  };

// Function call to initialize app
init();
