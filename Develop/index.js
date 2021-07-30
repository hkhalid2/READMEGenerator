// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// TODO: Create an array of questions for user input
const questions = [];


// uses promises to create writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

const generateREADME = (answers) =>
  ``;

// TODO: Create a function to initialize app
const init = () => {
    promptUser()
      .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
      .then(() => console.log('Successfully wrote to README.md'))
      .catch((err) => console.error(err));
  };

// Function call to initialize app
init();
