// TODO: Write code to define and export the Employee class
class Employee {
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  getEmail() {
    return this.email;
  }
}

const obj = new Employee("Ralph", 69, "ralph@lauren.co");
const obj3 = new Employee("Ralph2", 69, "ralph@lauren.co");
const obj4 = new Employee("Ralph", 69, "ralph@lauren.co");
const obj5 = new Employee("Ralph", 69, "ralph@lauren.co");
// const obj2 = {};
console.log(obj);
console.log(obj.getEmail());
const obj2 = {
  getName() {
    console.log("sldkfjsdfklj");
  },
};
// console.log(obj.get)
console.log(obj2);

module.exports = Employee;
