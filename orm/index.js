const db = require('../db')

module.exports = {
   
     getAllEmployee () { return db.query(`SELECT c1.id, c1.first_name, c1.last_name, c2.title, c4.name AS Department, c2.salary ,CONCAT(c3.first_name, " ", c3.last_name) AS Manager
     FROM employee c1 LEFT JOIN employee c3 ON c1.manager_id = c3.id INNER JOIN role c2 ON c2.id = c1.role_id
     INNER JOIN department c4 on c4.id = c2.department_id ORDER BY c1.id`)}, 

     getAllEmployeeByDepartment (department) { return db.query(`SELECT c1.id, c1.first_name, c1.last_name, c4.name AS Department
     FROM employee c1 LEFT JOIN employee c3 ON c1.manager_id = c3.id INNER JOIN role c2 ON c2.id = c1.role_id
     INNER JOIN department c4 on c4.id = c2.department_id WHERE c4.name = "${department}" ORDER BY c1.id`)} ,

     getAllEmployeeManager (id) { return db.query(`SELECT c1.id, c1.first_name, c1.last_name, CONCAT(c2.first_name, " ", c2.last_name) AS Manager
     FROM employee c1 LEFT JOIN employee c2 ON c1.manager_id = c2.id WHERE c2.id = "${id}" ORDER BY c1.id`)} ,

     getTable(name){ return db.query(`SELECT * FROM ${name}`)},

     getManager(){ return db.query(`SELECT DISTINCT CONCAT( c1.first_name, " " , c1.last_name ) 
                                    AS name, c1.id AS value FROM employee c1 INNER JOIN employee c2 WHERE  c1.id = c2.manager_id`)},

     add(table, data)
     {
            db.query(`INSERT INTO ${table} SET ?`, data, (err, info) => {
                console.log("info " + error)
                if (err) { console.log("Something is wrong, please try to add again !!!") } } )
     },

     update(table,changes,where)
     {
        db.query(`UPDATE ${table} SET ? WHERE ?`, [changes, where], (err, info) => {
            if (err) { console.error(err) } } )
     },
     delete(table,where)
     {
         console.log(where)
        db.query(`DELETE FROM ${table} WHERE ?`, where, (err, info) => {
            if (err) { console.error(err) } } )
     }
}