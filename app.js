// npm package mysql
const mysql = require('mysql2')
// npm package 'inquirer'
const { prompt } = require('inquirer')
// npm package to print rows to console
const cTable = require ('console.table')


// establishes connection params to database
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

// connecting file to database
connection.connect(function (err) {
  if (err) throw err;
  // console.log("connected as id " + connection.threadId + "\n");
  console.log('This is a command line application that allows employers to manage departments, roles, and employees in their company. The application permits employers to view, add, update or delete specific data points in their company employee database.')
  start();
});

// start questions to ask user
let start = () => {
  prompt([
    {
    type:'list',
    name:'questions',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'View All Employees By Department', 'View All Employee By Manager', 'View Roles', 'View Departments', 'Add Employee', 'Add Role', 'Add Department', 'Update Employee Role', 'Exit']
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
      case 'Add Role':
        addRole()
        break
      case 'Add Department':
        addDepartment()
        break
      case 'Update Employee Role':
        updateEmployeeRole()
        break
      case 'Exit':
        exit()
        break
    }
  })
  .catch(err => console.log(err))
}

// function that asks user if want to continue after each section
let decision = () => {
  prompt([
    {
      type: 'list',
      name: 'decision',
      message: 'Would you like to continue updating the data?',
      choices: ['Yes', 'No']
    }
  ])
    .then(({ decision }) => {
      switch (decision) {
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

// function that creates a table of employees and their data
let viewAllEmployees = () => {
  connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", department.name AS department, role.title, role.salary, CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id LEFT JOIN employee manager ON employee.manager_id = manager.id',  (err, res) => {
    if (err) { console.log(err) }
    //add line break
    console.log('\n')
    // use console.table to view results and format into table
    console.table(res)
    //function to prompt user: continue to add data or exit
    decision()
  })  
}    

// function to view employee by department name
let viewEmployeeDepartment = () => {
  connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", department.name AS "department", role.id AS "role id" FROM department INNER JOIN role ON department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id', (err, res) => {
  if (err) { console.log(err) }
  //add line break
  console.log('\n')
  // use console.table to view results and format into table
  console.table(res)
  //function to prompt user: continue to add data or exit
  decision()
  })
} 

// // function to view employee by manager
// let viewEmployeeManager = () => {
//   connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id', (err, res) => {
//     if (err) { console.log(err) }
//     //add line break
//     console.log('\n')
//     // use console.table to view results and format into table
//     console.table(res)
//     //function to prompt user: continue to add data or exit
//     decision()
//   })
// } 

// function to view roles in database
let viewRoles = () => {
  // query database, use AS to reformat table title
  connection.query('SELECT role.id AS "role id", role.title AS "title", role.salary AS "salary", department_id AS "department id" FROM role', (err, res) => {
    if (err) { console.log (err) }
    //add line break
    console.log('\n')
    // use console.table to view results and format into table
    console.table(res)
  //function to prompt user: continue to add data or exit
  decision()   
  })
}

// function to view departments in database
let viewDepartments = () => {
  //query database
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) { console.log (err) }
    //add line break
    console.log('\n')
    // use console.table to view results and format into table
    console.table(res)
  //function to prompt user: continue to add data or exit
  decision()   
  })
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
      message: `Select the employee's role:`,
      choices: 
      [
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
    .then(({ firstName, lastName, newEmployeeRole }) => {
      //console.log to check that responses render
      //console.log(firstName, lastName, newEmployeeRole)
      
      connection.query('INSERT INTO employee SET ?', 
      {
        first_name: `${firstName}`,
        last_name: `${lastName}`,
        role_id: `${newEmployeeRole}`
      }, (err, res) => {
        if (err) { console.log(err) }
        //add line break
        console.log('\n')
        //is there a way to show new employee?
        console.table(res.affectedRows + "employee added!\n")
      })
      //function to prompt user: continue to add data or exit
      decision()  
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
      type: 'list',
      name: 'selectDept',
      message: `Select the department the new role corresponds to:`,
      choices: [
      {
        name:'operations',
        value: 1
      },
      {
        name: 'accounting',
        value: 2
      },
      {
        name: 'sales',
        value: 3
      },
      {
        name: 'engineering',
        value: 4
      },
      {
        name: 'human resources',
        value: 5
      }
     ]
    }
  ])
  .then (({ titleName, newSalary, selectDept }) =>{
    //console.log to check that responses render
    console.log(titleName, newSalary, selectDept)
    // connection.query('INSERT INTO role SET ?',
    // {
    //   title: `${titleName}`,
    //   salary: `${newSalary}`,
    //   department_id: `${selectDept}.value`
    // }, (err, res) => {
    //   if (err) { console.log(err) }
        //add line break
        // console.log('\n')
    //   //is there a way to show the new added role?
    //   console.table(res.affectedRows + "role added!\n")
    // })
  })
  .catch(err => console.log(err))
  //function to prompt user: continue to add data or exit
  decision() 
}

// function to add a department to database
let addDepartment = () => {
  prompt([
    {
      type: 'input',
      name: 'newDeptName',
      message: `Enter the department you would like to add:`
    }
  ])
  .then(({ newDeptName }) => {
    connection.query('INSERT INTO department SET ?', 
    {
      name: `${newDeptName}`
    }, (err, res) => {
      if (err) { console.log(err) }
      //add line break
      console.log('\n')
      console.table(res.affectedRows + "department added!\n")
    //function to prompt user: continue to add data or exit
    decision() 
    })
  })  
}

updateEmployeeRole = () => {
  //function to allow user to view current employee list ** doesn't allow for prompt to process
  // currentEmployeeList()

  //add line break
  console.log('\n')

  prompt([
    {
      type: 'input',
      name: 'lastName',
      message: `Enter the last name of the employee:`
    },
    {
      type: 'input',
      name: 'firstName',
      message: `Enter the first name of the employee:`
    },
    {
      type: 'list',
      name: 'updateEmployeeRole',
      message: `Select the employee's new role:`,
      choices: 
      [
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
    .then(({ firstName, lastName, updateEmployeeRole }) => {
      //console.log to check that responses render
      console.log(firstName, lastName, updateEmployeeRole)
      // function to prompt user: continue to add data or exit
      decision() 
  })
  .catch(err => console.log(err))
}

// function that allows user to see list of employees
let currentEmployeeList = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
  if (err) { console.log(err) }
  console.table(res)
  })
}

// function to exit the application
let exit = () => {
  console.log('exit')
  connection.end()
  process.exit
}