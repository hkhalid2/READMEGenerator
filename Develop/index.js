//Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

//Inquirer questions asked through the console to be used to generate read me
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

      //uses cursor to cycle through the list of 5 options and pick one
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

//function that adds respective licensebadge/notice to questions object based on license answer
const licenseprops = (answers) => {
        if (answers.license === 'MIT License') {
            answers.symbol = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            answers.info = `MIT License

            Copyright (c) 2021 Hamza Khalid
            
            Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
            
            The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE`;
        }
        else if (answers.license === 'Apache License 2.0') {
            answers.symbol = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
            answers.info = `Copyright 2021 Hamza Khalid

            Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
            
               http://www.apache.org/licenses/LICENSE-2.0
            Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License`;
        }
        else if (answers.license === 'The Unlicense') {
            answers.symbol = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
            answers.info = `This is free and unencumbered software released into the public domain.

            Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.
            
            In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
            
            For more information, please refer to https://unlicense.org`;
        }
        else if (answers.license === 'Mozilla Public License 2.0') {
            answers.symbol = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
            answers.info = "notice too long/could not be found";
        }
        else {
            answers.license.symbol = "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
            answers.license.info = `
            Boost Software License - Version 1.0 - August 17th, 2003
            
            Permission is hereby granted, free of charge, to any person or organization obtaining a copy of the software and accompanying documentation covered by this license (the "Software") to use, reproduce, display, distribute, execute, and transmit the Software, and to prepare derivative works of the Software, and to permit third-parties to whom the Software is furnished to do so, all subject to the following:
            
            The copyright notices in the Software and this entire statement, including the above license grant, this restriction and the following disclaimer, must be included in all copies of the Software, in whole or in part, and all derivative works of the Software, unless such copies or derivative works are solely in the form of machine-executable object code generated by a source language processor.
            
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
        }
        return answers;
};


// uses promises to create writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

//Generates framework for read me 
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

//Function to initialize app
const init = () => {
    questions()
      .then((answers) => licenseprops(answers))
      .then((response) => writeFileAsync('README.md', generateREADME(response)))
      .then(() => console.log('Successfully wrote to README.md'))
      .catch((err) => console.error(err));
  };

// Function call to initialize app
init();
