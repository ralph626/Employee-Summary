const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
//inquirer logic here\

// function to initialize program

const employeeQuestions = [
  { message: "What is this employee's name?", name: "name" },
  { message: "What is this employee's id?", name: "id" },
  { message: "What is this employee's email?", name: "email" },
];

const specificEmployee = {
  manager: [
    ...employeeQuestions,
    {
      message: "What is this employee's office number?",
      name: "officeNumber",
    },
  ],
  intern: [],
  engineer: [],
};

const nextSteps = [
  {message: "Do you want to add an employee?", name:"addEmployee" type: "confirm"},
  {
    message: "What type of employee would you like to add?", 
    name: "type",  
    type: "choice", 
    options: ["intern","engineer"],
    when: givenAnswers => givenAnswers.addEmployee
  }
];

class Program {
  constructor() {
    this.employees = [];
  }
  async init() {
    // start of program
    console.log("First, please enter Manger info:")
    await this.addEmployee("manager");
    await this.nextSteps();
    
  }
  async nextSteps(){
    const next = await inquirer.prompt(nextSteps);
    if(next.addEmployee){
      await this.addEmployee(next.type);
      await this.nextSteps();
    } else {
      writeOutput(render(this.employees));
    }
  },

  async addEmployee(type) {
    const info = await inquirer.prompt(specificEmployee[type]);
    const keys = Object.keys(info);
    if (type === "manager") {
      this.employees.push(
        new Manager(info.name, info.id, info.email, info[keys[3]])
      );
    }
  }
}

function writeOutput(html) {
  fs.writeFileSync(__dirname + "/output/index.html", html, "utf8");
}

const run = new Program();
run.init();

// const employees = [
//   new Manager("Sam Sutton", 1, "ss@email.com", "123456"),
//   new Intern("Felix the Cat", 2, "fc@email.com", "wyzard school"),
// ];
// writeOutput(render(employees));
