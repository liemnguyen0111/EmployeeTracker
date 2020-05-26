  
const db = require('../db')
const {writeFile} = require('fs')
const {promisify} = require('util')

const wfs = promisify(writeFile)
let data
const department = 
{
    
     getDepartment ()
    {
      
           db.query(`SELECT * FROM department`,
            function(err, results, fields) {
                wfs('./temp/index.json',JSON.stringify(results))
                .then(res => console.log('Succeed'))
                .catch(err => console.log(err))
        
           }
         );
    }
,
    addDepartment(data)
    {
    db.query(`INSERT INTO department(name) 
    SELECT  "${data}"
    WHERE NOT EXISTS(
        SELECT name FROM department WHERE name = ("${data}")
    ) LIMIT 1;`, (err, res) => {
        if (err) { console.error(err) }
        if(res.affectedRows === 0)
        {
            console.log(`|=>>>>>>> ${data} ALREADY EXISTED `)
        }
        else
        {
            console.log(`|=>>>>>>> ${data} ADDED SUCCESSFULY `)
        }
      
      })
    },

    // Delete department
    deleteDepartment(data)
    {
        let temp 
        db.query(`SELECT name FROM department WHERE id = ${data}`, (err,res)=> {temp = res[0]})
        db.query(`DELETE FROM department WHERE id = ${data};`, (err,res) =>
        {
            if(err) {console.error(err)}
            if(res.affectedRows === 0)
        {
            console.log(`|=>>>>>>> DEPARTMENT NOT EXISTED `)
        }
        else
        {
            console.log(`|=>>>>>>> DEPARTMENT ${temp.name} DELETED SUCCESSFULY `)
        }
        
        })
    },
    endConnection()
    {
        db.end()
    }

}

module.exports = department