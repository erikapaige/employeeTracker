// EXTRA IF HAVE TIME
// function to allow user to remove an employee
// let removeEmployee = () => {
//   connection.query('', (err, res) => {
//     if (err) { console.log(err) }
//     console.table(res)
//     console.log('Employee has been removed from database')

//   //function to prompt user: continue to add data or exit
//   decision()
//   })
// } 

//need a way to prompt for employee name, last name and role_id
let removeEmployee = () => {
  prompt([
    {
      type: 'list',
      name: 'value',
      message: `Select the employee you'd like to remove:`,
      choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    }
  ])
    .then(({ value }) => {
      //console.log to check that responses render
      // console.log(removeEmployee)
      connection.query('DELETE FROM employee WHERE ?',
        {
          id: `${value}`,
        }, (err, res) => {
          if (err) { console.log(err) }

          // add line break
          console.log('\n')

          //console.table updated table
          console.table(res)

          // add line break
          console.log('\n')

          console.log('Employee has been removed from database')
        })
      //function to prompt user: continue to add data or exit
      decision()
    })
    .catch(err => console.log(err))
}