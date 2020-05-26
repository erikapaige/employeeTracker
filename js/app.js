//node pkg: file save system
const { writeFile, appendFile, readFile } = require('fs')
//npm package 'inquirer'
const { prompt } = require('inquirer')
const { promisify } = require('util')

let startAnswers = []
// console.log('This is a command line application that allows employers to manage departments, roles, and employees in their company. The application permits employers to view, add, update or delete specific data points in their company employee database.')

//npm start is function to being command line

//start questions to ask user
let start = () => {
  prompt([
    {
    type:'list',
    name:'questions',
    message: 'What would you like to do?',
    choices: ['Add a department', 'Add a role', 'Add an employee', 'View a department', 'View a role', 'View an employee', 'Update an employee role']
    }
  ])
  .then (({ questions }) =>{ 
    // confirm prompts displaying /processing data 
    // console.log(questions)
    switch(questions) {
      case 'Add a department':
        addDepartment()
        break
      case 'Add a role':
        addRole()
        break
      case 'Add an employee':
        addEmployee()
        break
      case 'View a department':
        viewDepartment()
        break
      case 'View a role':
        viewRole()
        break
      case 'View an employee':
        viewEmployee()
        break
      case 'Update an employee role':
        updateEmployeeRole()
        break
    }
  })
  .catch(err => console.log(err))
}

start()

//function for user to add new department to table
addDepartment()

//function for user to add a new role to table
addRole()

//function for employee to add a new employee to table
addEmployee()

//function to view departments
viewDepartment()

//function to view roles
viewRole()

//function to view employees
viewEmployee()

//function to view empoloyee with roles
updateEmployeeRole()

