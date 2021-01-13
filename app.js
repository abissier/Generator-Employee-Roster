const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers= [];

function employeeQuestion() {
    inquirer.prompt([
        {
            type: "list",
            message: "Please select which type of employee is to be added to the roster: ",
            name: "employeeType",
            choices: ["Intern", "Manager", "Engineer", "Create Webpage"]
        },
    ]).then(answers => {
        if (answers.employeeType === "Engineer") {
            engineerQuestions();
        } else if (answers.employeeType === "Manager") {
            managerQuestions();
        } else if (answers.employeeType === "Intern") {
            internQuestions();
        } else if (answers.employeeType === "Create Webpage") {
            createWebpage(outputPath, render(teamMembers));
        };
    });
};

const engineerQuestions = () =>
    inquirer.prompt([
        {
            type: "input",
            prefix: ">",
            name: "name",
            message: "What is the Engineer's name? "
        },
        {
            type: "input",
            prefix: ">",
            name: "id",
            message: "What is the Engineer's employee ID? "
        },
        {
            type: "input",
            prefix: ">",
            name: "email",
            message: "What is the Engineer's email address? "
        },
        {
            type: "input",
            prefix: ">",
            name: "github",
            message: "What is the Engineer's github username? "
        }
    ]).then(answers => {
        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);

        employeeQuestion();
    });

const managerQuestions = () =>
    inquirer.prompt([
        {
            type: "input",
            prefix: ">",
            name: "name",
            message: "What is the Manager's name? "
        },
        {
            type: "input",
            prefix: ">",
            name: "id",
            message: "What is the Manager's employee ID? "
        },
        {
            type: "input",
            prefix: ">",
            name: "email",
            message: "What is the Manager's email address? "
        },
        {
            type: "input",
            prefix: ">",
            name: "officeNumber",
            message: "What is the Manager's office number? "
        }
    ]).then(answers => {
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(manager);

        employeeQuestion();
    });

const internQuestions = () =>
    inquirer.prompt([
        {
            type: "input",
            prefix: ">",
            name: "name",
            message: "What is the Interns's name? "
        },
        {
            type: "input",
            prefix: ">",
            name: "id",
            message: "What is the Intern's employee ID? "
        },
        {
            type: "input",
            prefix: ">",
            name: "email",
            message: "What is the Intern's email address? "
        },
        {
            type: "input",
            prefix: ">",
            name: "school",
            message: "Which school is the Intern attending? "
        }
    ]).then(answers => {
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(intern);

        employeeQuestion();
    });

function createWebpage(fileName, data) {
    fs.writeFile(fileName, data, "utf8", err => {
        if (err) throw err;

        console.log("Your file has been created.");
    });
};

employeeQuestion();