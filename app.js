//npm package 'inquirer'
const mysql = require('mysql2')
const { prompt } = require('inquirer')
const cTable = require ('console.table')

const connection = mysql.createConnection({
  host: 'localhost',
  // port
  port: 3306,
  //username
  user: 'root',
  // (my/)user password 
  password: 'rootroot1',
  //name of database
  database: 'company_db'
})

//connecting file to mysql
connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId + "\n");
  console.log('This is a command line application that allows employers to manage departments, roles, and employees in their company. The application permits employers to view, add, update or delete specific data points in their company employee database.')
  start();
});

//npm start is function to begin command line

// start questions to ask user
let start = () => {
  prompt([
    {
    type:'list',
    name:'questions',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'View All Employees By Department', 'View All Employee By Manager', 'View Roles', 'View Departments', 'Add Employee', 'Add Role', 'Update Employee Role', 'Update Employee Manger', 'Exit']
    }
  ])
  .then (({ questions }) =>{ 
    // confirm prompts displaying / processing data 
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
      case 'View Roles':
        viewRoles()
        break
      case 'View Departments':
        viewDepartments()
        break
      case 'Add Employee':
        addEmployee()
        break
      case 'Remove Employee':
        addRole()
        break
      case 'Update Employee Role':
        addDepartment()
        break
      case 'Update Employee Manager':
        updateEmployeeRole()
        break
      case 'Exit':
        exit()
        // console.log('exit')
        // connection.end()
        // process.exit
        break
    }
  })
  .catch(err => console.log(err))
}

// function that creates a table of employees and their data
let viewAllEmployees = () => {
  connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", department.name AS department, role.title, role.salary, CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id',  (err, res) => {
    if (err) { console.log(err) }
    //log results from SELECT statement
    console.table(res)
  // function to prompt user: continue to add data or exit
  decision()
  })  
}    

// function to view employee by department name
let viewEmployeeDepartment = () => {
  connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", department.name AS "department", role.id AS "role id" FROM department INNER JOIN role ON department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id', (err, res) => {
  if (err) { console.log(err) }
  console.table(res)
  })
  decision()
} 

// function to view employee by manager
let viewEmployeeManager = () => {
  connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id', (err, data) => {
    if (err) { console.log(err) }
    console.table(data)
  })
  // function to prompt user: continue to add data or exit
  decision()
} 

// function to add employee to database
let addEmployee = () => {

  prompt([
    {
      type: 'input',
      name: 'firstName',
      message: `Enter the employee's first name:`
    },
    {
      type: 'input',
      name: 'lastName',
      message: `Enter the employee's last name:`
    },
    {
      type: 'list',
      name: 'newEmployeeRole',
      message: `What is the employee's role?`,
      choices: [
        {
          name: 'operation manager',
          value: 1
        },
        {
          name: 'accounting manager',
          value: 2
        },
        {
          name: 'sales manager',
          value: 3
        },
        {
          name: 'engineering manager',
          value: 4
        },
        {
          name: 'sales rep',
          value: 5
        },
        {
          name: 'engineer',
          value: 6
        },
        {
          name: 'human resource representative',
          value: 7
        }
      ]
    }
  ])
    .then(({ firstName, lastName, newEmployeeRole, }) => {
      //console.log to check the response
      //console.log(firstName, lastName, newEmployeeRole)
      
      connection.query('INSERT INTO employee SET ?', 
      {
        first_name: `${firstName}`,
        last_name: `${lastName}`,
        role_id: `${newEmployeeRole}`
      }, (err, res) => {
        if (err) { console.log(err) }
        //is there a way to show new employee?
        console.table(res.affectedRows + "employee updated!")
      })
    })
    .catch(err => console.log(err))
}

// function to add role to database
let addRole = () => {
  prompt([
    {
      type: 'input',
      name: 'titleName',
      message: `Enter the role you would like to add:`
    },
    {
      type: 'number',
      name: 'newSalary',
      message: `Enter the salary for the added role:`
    },
    {
      type: 'input',
      name: 'selectDept',
      message: `Enter the department the new role corresponds to:`
    }
  ])
  .then (({ titleName, newSalary, selectDept }) =>{
    console.log(titleName, newSalary, selectDept)
    // connection.query('INSERT INTO role SET')
  })
  .catch(err => console.log(err))
}

// function to add a department to database
// let addDepartment = () => {
//   prompt([
//     {
//       type: 'input',
//       name: 'firstName',
//       message: `Enter the employee's first name:`
//     },

// }
// EXTRA IF HAVE TIME
//function to allow user to remove an employee
// let removeEmployee = () => {
//   connection.query('', (err, res) => {
//     if (err) { console.log(err) }
//     console.table(res)
    // console.log('Employee has been removed from database')

// function to prompt user: continue to add data or exit
// decision()
//   })
// } 

// function that asks user if want to continue after each section
let decision = () => {
  prompt([
      {
        type: 'input',
        name: 'addEmp',
        message: 'Would you like to continue updating the data?',
        choices: ['Yes', 'No']
      }
    ])
      .then(({ update }) => {
        switch (update) {
          case 'Yes':
            start()
            break
          case 'No':
            exit()
            break
        }
      })
      .catch(err => console.log(err))
}

// function to exit the application
let exit = () => {
  console.log('exit')
  connection.end()
  process.exit
}