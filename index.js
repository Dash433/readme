
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "Please describe your appilication"
    },
    {
      type: "input",
      name: "installation",
      message: "What are your instructions for installation?"
    },
    {
      type: "input",
      name: "usuage",
      message: "What is the usage for your application"
    },{
      type: "list",
      
      name: "license",
      message: "Pick a license to use",
      choices: [
        "Apache License 2.0",
        "GNU General Public License v3.0",
        "MIT License",
        "BSD 2-Clause Simplified License",
        "Creative Commons Zero v1.0 Universal",
        "None",
      ]
    },
    {
      type: "input",
      name: "contributing",
      message: "what are the contributions to the project"
    },
    {
      type: "input",
      name: "test",
      message: "Has is passed all the required test?"
    },
    {
      type: "input",
      name: "user",
      message: "What is your github username"
    },
    {
      type: "input",
      name: "email",
      message: "What is your email"
    },
    
  ]);
}

function generateREADME(prompts) {
  return `
  # ${prompts.title}
  ### Description: ${prompts.description}
  ## Table of Contents
  #### Installation ${prompts.installation}
  #### Usage: ${prompts.usuage}
  #### License: ${prompts.license}
  #### Contributing: ${prompts.contributing}
  #### Tests: ${prompts.test}
  #### Questions click here: https://github.com/${prompts.user} or email me here ${prompts.email}

    `;
}

promptUser()
  .then(function(prompts) {
    const md = generateREADME(prompts);

    return writeFileAsync("README.md", md);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });
