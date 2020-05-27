// function to set db of employees equal to variable to be used in updateEmployeeRole()
const employee = connection.query('SELECT * FROM employee', (err, res) => {
  if (err) { console.log(err) }
  //console log results to get objects
  //need to turn into an array to use for map?
  console.log(res)
})

updateEmployeeRole = () => {
  // let emp = connection.query('SELECT * FROM employee', (err, res) => {
  // if (err) { console.log(err) }
  // // console.table(res)
  // })
  //add line break
  console.log('\n')

  //destructuring employee choices
  const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }))
  console.log(empChoices)

  //destructuring employee choices
  const employeeChoices = employee.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }))
  console.log(empChoices)