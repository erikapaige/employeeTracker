// EXTRA IF HAVE TIME
// function to allow user to remove an employee
let removeEmployee = () => {
  connection.query('', (err, res) => {
    if (err) { console.log(err) }
    console.table(res)
    console.log('Employee has been removed from database')

//function to prompt user: continue to add data or exit
decision()
  })
} 