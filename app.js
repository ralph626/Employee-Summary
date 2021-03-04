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

//questions for the employee
const employeeQuestions = [
  { message: "What is this employee's name?", name: "name" },
  { message: "What is this employee's id?", name: "id" },
  { message: "What is this employee's email?", name: "email" },
];
//if its filling out the manager info it asks what the office number is
const specificEmployee = {
  manager: [
    ...employeeQuestions,
    {
      message: "What is this employee's office number?",
      name: "officeNumber",
    },
  ],
  //if its filling out the intern info it asks what their school is
  intern: [
    ...employeeQuestions,
    {
      message: "What is this employee's school?",
      name: "school",
    },
  ],
  //if its filling out the engineer info it asks what their GitHub is
  engineer: [
    ...employeeQuestions,
    {
      message: "What is this employee's github?",
      name: "github",
    },
  ],
};
//if the user wants to add another employee
const nextSteps = [
  {
    message: "Do you want to add an employee?",
    name: "addEmployee",
    type: "confirm",
  },
  //what type of employee
  {
    message: "What type of employee would you like to add?",
    name: "type",
    type: "list",
    choices: ["intern", "engineer"],
    when: (givenAnswers) => givenAnswers.addEmployee,
  },
];

class Program {
  constructor() {
    this.employees = [];
    this.employeeTypes = {
      manager: Manager,
      intern: Intern,
      engineer: Engineer,
    };
  }
  async init() {
    // start of program
    //the manager is first
    console.log("First, please enter Manger info:");
    await this.addEmployee("manager");
    await this.nextSteps();
  }
  //calls what ever was chosen in the employee list
  async nextSteps() {
    const next = await inquirer.prompt(nextSteps);
    if (next.addEmployee) {
      await this.addEmployee(next.type);
      await this.nextSteps();
    } else {
      writeOutput(render(this.employees));
    }
    return true;
  }
  //getting input placed
  async addEmployee(type) {
    const info = await inquirer.prompt(specificEmployee[type]);
    const keys = Object.keys(info);
    this.employees.push(
      new this.employeeTypes[type](
        info.name,
        info.id,
        info.email,
        info[keys[3]]
      ) // new Manager(info.name, info.id, info.email, info.officeNumber)
    );
    return true;
    // if (type === "manager") {
    //   this.employees.push(
    //     new Manager(info.name, info.id, info.email, info[keys[3]])
    //   );
    // } else if()
  }
}
//created the html puts it in the folder output
function writeOutput(html) {
  fs.writeFileSync(__dirname + "/output/index.html", html, "utf8");
}
//runs
const run = new Program();
run.init();

// const employees = [
//   new Manager("Sam Sutton", 1, "supercool@email.com", "123456"),
//   new Intern("Felix the Cat", 2, "fc@email.com", "wizard school"),
// ];
// writeOutput(render(employees));
