const db = require('../db/index.js')

//build class called Department
class Department {
  constructor(id, name) {
   this.id = id
   this.name = name

   this.id = () => {
     db.query('SELECT * FROM company' (err, data) => {
       if (err) { console.log(err) }
       return this.id
     })
   }

   this.name = () => {
     db.query('SELECT * FROM company' (err, data) =>{
       if (err) { console.log(err) }
       return this.name
     })
   }
}

// set module.exports 
module.exports = Department