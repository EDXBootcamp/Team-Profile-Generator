const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


const team = [];

// Function to prompt user for manager's information
function promptManager() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the manager's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the manager's employee ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the manager's email:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter the manager's office number:"
        }
    ]);
}

// Function to prompt user for engineer's information
function promptEngineer() {
    return inquirer.prompt([
        // Add prompts for engineer's information here
    ]);
}

// Function to prompt user for intern's information
function promptIntern() {
    return inquirer.prompt([
        // Add prompts for intern's information here
    ]);
}

// Function to prompt user to add another team member or finish
function promptToAddOrFinish() {
    return inquirer.prompt([
        // Add prompt for adding another team member or finishing here
    ]);
}

// Function to initialize the application
function init() {
    console.log("Welcome to the Team Generator!");

    // Prompt user for manager's information
    promptManager()
        .then(managerData => {
            const { name, id, email, officeNumber } = managerData;
            const manager = new Manager(name, id, email, officeNumber);
            team.push(manager);
            return promptToAddOrFinish();
        })
        .then(({ addOrFinish }) => {
            // Implement logic based on user choice to add another team member or finish
        })
        .catch(err => {
            console.error("Error:", err);
        });
}

// Call init function to start the application
init();