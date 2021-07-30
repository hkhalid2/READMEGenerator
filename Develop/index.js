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
        message: "What is the your Github profile username ?",
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
  ``;

// TODO: Create a function to initialize app
const init = () => {
    questions()
      .then((answers) => writeFileAsync('README.md', generateREADME(answers)))
      .then(() => console.log('Successfully wrote to README.md'))
      .catch((err) => console.error(err));
  };

// Function call to initialize app
init();
