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
    choices: ['View All Employees', 'View All Employees By Department', 'View All Employee By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Role', 'Update Employee Manger', 'Exit']
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
      case 'Exit':
        console.log('exit')
        connection.end()
        process.exit
        break
    }
  })
  .catch(err => console.log(err))
}


let viewAllEmployees = () => {
  connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", department.name AS department, role.title, role.salary, CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id', function(err, res) {
    if (err) { console.log(err) }
    //log results from SELECT statement
    console.table(res)

  // needs to wait until query given answer
  prompt([
    {
      type: 'list',
      name: 'update',
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
    .catch (err => console.log(err))
  })  
}    

// let viewEmployeeDepartment = () => {
//   db.query('SELECT * FROM department', (err, data) => {
//   if (err) { console.log(err) }
//   console.table(data)
//   })
//   //needs to wait until query given answer
//   prompt([
//     {
//       type: 'list',
//       name: 'update',
//       message: 'Would you like to continue updating the data?',
//       choices: ['Yes', 'No']
//     }
//   ])
//     .then(({ update }) => {
//       switch (update) {
//         case 'Yes':
//           start()
//           break
//         case 'No':
//           exit()
//           break
//       }
//     })
//     .catch(err => console.log(err))
// } 

// viewEmployeeManager()

// let addEmployee() => {
//     prompt([
//       {
//         type: 'input',
//         name: 'addEmp',
//         message: 'Would you like to continue updating the data?',
//         choices: ['Yes', 'No']
//       }
//     ])
//       .then(({ update }) => {
//         switch (update) {
//           case 'Yes':
//             start()
//             break
//           case 'No':
//             exit()
//             break
//         }
//       })
//       .catch(err => console.log(err))
//   }   
// }

// removeEmployee()

// updateEmployee()

// updateEmployeeManager()

let exit = () => {
  console.log('exit')
  connection.end()
  process.exit
}