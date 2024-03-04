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
        {
            type: "input",
            name: "name",
            message: "Enter the engineer's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the engineer's employee ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the engineer's email:"
        },
        {
            type: "input",
            name: "github",
            message: "Enter the engineer's GitHub username:"
        }
    ]);
}

// Function to prompt user for intern's information
function promptIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the intern's name:"
        },
        {
            type: "input",
            name: "id",
            message: "Enter the intern's employee ID:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter the intern's email:"
        },
        {
            type: "input",
            name: "school",
            message: "Enter the intern's school:"
        }
    ]);
}

// Function to prompt user to add another team member or finish
function promptToAddOrFinish() {
    return inquirer.prompt([
        {
            type: "list",
            name: "addOrFinish",
            message: "Would you like to add another team member or finish?",
            choices: ["Add Engineer", "Add Intern", "Finish Building the Team"]
        }
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
            // Function to handle adding another team member or finishing
            const handleAddOrFinish = ({ addOrFinish }) => {
                if (addOrFinish === "Add Engineer") {
                    // Prompt user for engineer's information
                    promptEngineer()
                        .then(engineerData => {
                            const { name, id, email, github } = engineerData;
                            const engineer = new Engineer(name, id, email, github);
                            team.push(engineer);
                            return promptToAddOrFinish().then(handleAddOrFinish);
                        });
                } else if (addOrFinish === "Add Intern") {
                    // Prompt user for intern's information
                    promptIntern()
                        .then(internData => {
                            const { name, id, email, school } = internData;
                            const intern = new Intern(name, id, email, school);
                            team.push(intern);
                            return promptToAddOrFinish().then(handleAddOrFinish);
                        });
                } else {
                    // Generate HTML page once the user chooses to finish
                    fs.writeFileSync(outputPath, render(team));
                    console.log(`HTML page generated successfully at ${outputPath}`);
                }
            };

            // Handle adding another team member or finishing
            handleAddOrFinish({ addOrFinish });
        })
        .catch(err => {
            console.error("Error:", err);
        });
}


// Call init function to start the application
init();