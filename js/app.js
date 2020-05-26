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
    choices: ['View All Employees', 'View All Employees By Department', 'View All Employee By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manger']
    }
  ])
  .then (({ questions }) =>{ 
    // confirm prompts displaying /processing data 
    // console.log(questions)
    switch(questions) {
      case 'View All Employees':
        viewAllEmployees()
        break
      case 'View All Employees By Department':
        viewEmployeeDepartment()
        break
      case 'View All Employees by Manager':
        viewEmployeeManager()
        break
      case 'Add Employee':
        addEmployee()
        break
      case 'Remove Employee':
        removeEmployee()
        break
      case 'Update Employee Role':
        updateEmployee()
        break
      case 'Update Employee Manager':
        updateEmployeeManager()
        break
    }
  })
  .catch(err => console.log(err))
}

start()

viewAllEmployees()

viewEmployeeDepartment()

viewEmployeeManager()

addEmployee()

removeEmployee()

updateEmployee()

updateEmployeeManager()