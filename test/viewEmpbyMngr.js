// // function to view employee by manager
let viewEmployeeManager = () => {
  connection.query('SELECT employee.first_name AS "first name", employee.last_name AS "last name", CONCAT (manager.first_name, " " , manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON employee.manager_id = manager.id', (err, res) => {
    if (err) { console.log(err) }
    //add line break
    console.log('\n')
    // use console.table to view results and format into table
    console.table(res)
    //function to prompt user: continue to add data or exit
    decision()
  })
} 