//here we generate readme file and the question which we want to fill to generate readme file
let inquirer = require('inquirer');
let fs = require('fs');

inquirer
    .prompt([
        {// in this asking the titel of project
            type: "input",
            message: "What is the title of your project?",
            name: "title"
        },
        {  // in this asking some description about your project 
            type: "input",
            message: "Enter a description for your project:",
            name: "description"
        },
        {  // in this asking installation process
            type: "input",
            message: "Enter installation insruction:",
            name: "install"
        },
        {// in this asking info about project 
            type: "input",
            message: "Enter usage information for your project:",
            name: "usage"
        },
        { // in this asking contribution of your project 
            type: "input",
            message: "Enter contribution guidelines for your project:",
            name: "contribution"
        },
        { // test info about your project 
            type: "input",
            message: "Enter test information for your project:",
            name: "testing"
        },
        { //My github name
            type: "input",
            message: "Enter your GitHub Username:",
            name: "github"
        },
        { //My email
            type: "input",
            message: "Enter your email address:",
            name: "email"
        },
        {//license 
            type: "list",
            message: "Which license does this project fall under?",
            name: "license",
            choices: [
                "MIT License",
                "Code Project Open License (CPOL)",
                "Common Development and Distribution License (CDDL)",
                "Microsoft Public License (Ms-PL)",
                "Mozilla Public License 1.1 (MPL 1.1)",
                "Common Public License Version 1.0 (CPL)",
                "Eclipse Public License 1.0",
                "Apache License, Version 2.0"
            ]
        }
    ])
//creating readme file
    .then((res) => {
        console.log("Creating README file...");
        createREADMEFile(res);
        
    })
    .catch((err) => {
        console.log(err);
    })
    
    //function to create readme file 
function createREADMEFile(input) {
    let readmeTitle;
    let readmeDescription;
    const descriptionHead = "## Description";
    let tableOfContents;
    const tocHead = "## Table of Contents";
    let installArr;
    const installHead = "## Installation";
    let readmeUsage;
    const usageHead = "## Usage";
    let readmeContribution;
    const contributionHead = "## Contribution";
    let readmeTest;
    const testingHead = "## Tests";
    let readmeLicence = input.license;
    const licenseHead = "## License";
    let readmeQuestions;
    const creditsHead = "## Credits";
    let completeREADME = [];
    
    // Adding Title
    if (input.title == '') {
        readmeTitle = '# TITLE';
    } else {
        readmeTitle = `# ${input.title}`;
    }
    completeREADME.push(readmeTitle);
    
    
    //Add in license badge here!!
    let badge = `![](https://img.shields.io/badge/license-${readmeLicence.replace(/ /g, "%20")}-blue?style=flat-square)`;
    completeREADME.push(badge);
    
    
    // Adding description
    if (input.description == '') {
        readmeDescription = `${descriptionHead}\n Enter project description here.`;
    } else {
        readmeDescription = `${descriptionHead}\n${input.description}`;
    }
    completeREADME.push(readmeDescription);
    
    
    //Adding Table of Contents
    tableOfContents = `${tocHead}\n* [Installation](#installation)\n* [Usage](#usage)\n* [Contribution](#contribution)\n* [Tests](#tests)\n* [License](#license)\n* [Questions](#questions)\n`;
    completeREADME.push(tableOfContents);
    
    
    //Adding installation instructions
    completeREADME.push(`${installHead}`);
    
    installArr = input.install.split(',').map(item => {
        return `${item.trim()}`;
    });
    
    for (var i = 0; i < installArr.length; i++) {
        completeREADME.push(`${i + 1}. ${installArr[i]}`);
    }
    
    
    //Adding Usage
    if (input.usage == '') {
        readmeUsage = `\n${usageHead}\n Enter project usage here.`;
    } else {
        readmeUsage = `\n${usageHead}\n${input.usage}`;
    }
    completeREADME.push(readmeUsage);
    
    
    //Adding Contributing
    if (input.contribution == '') {
        readmeContribution = `\n${contributionHead}\n Enter project contriburtion information here.`;
    } else {
        readmeContribution = `\n${contributionHead}\n${input.contribution}`;
    }
    completeREADME.push(readmeContribution);
    
    
    //Adding Tests
    if (input.testing == '') {
        readmeTest = `\n${testingHead}\n Enter project testing information here.`;
    } else {
        readmeTest = `\n${testingHead}\n${input.testing}`;
    }
    completeREADME.push(readmeTest);
    
    
    //License info
    readmeLicence = `\n${licenseHead}\nThis project is covered under the ${input.license}.`;
    completeREADME.push(readmeLicence);
    
    
    //Credits section with github link
    readmeCredits = `\n${creditsHead}\n For Credits about this project, please see my GitHub at [${input.github}](https://github.com/${input.github}), or reach out by email at ${input.email}.`;
    completeREADME.push(readmeCredits);
    
    
    //Joining the created README Array with a newline separator
    const README = completeREADME.join('\n');
        
    
    //Creating the README
    fs.writeFile("./example/README-example.md", README, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("README file successfully created!");
        }
    });
}