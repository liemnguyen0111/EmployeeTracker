const chalk = require('chalk')
const axios = require('axios')
const {getDepartment,addDepartment,deleteDepartment,endConnection} = require('./routes/departmentRoutes')
const {prompt} = require('inquirer')
const myData = require('./temp')

const {writeFile} = require('fs')
const {promisify} = require('util')

const wfs = promisify(writeFile)

const db = require('./db')

// Test
// closeConnection()
// addDepartment("Engineer")
// let a = getDepartment()

// Process user choice
const actionProcessing = (data) =>
{
    data = data.split(' ')
     switch(data[0])
    {
        case 'View':
            getDepartment()
            console.log(myData)
            init()
            break
        case 'Add':
            console.log('Add')
            init()
            break
        case 'Remove':
            console.log('Remove')
            init()
            break
        case 'Update':
            console.log('Update')
            init()
            break
        case 'Exit':      
        wfs('./temp/index.json','[]')
        .then(res => 
            {
                console.log("Bye")
                endConnection()
            })
        .catch(err => console.log(err))
                   
            break
    }
}


let init = (index) =>
{
    // Choices list
    const list = [
      "View All Employees", "View All Employees By Department", 
        "View All Employees By Manager", "Add Employee", "Remove Employee", 
        "Update Employee Role", "Update Employee Manager",
        "View all roles", "Add role", "Remove role", "Exit"]
    
    // Prompt user with choices
    prompt({
        type: 'list',
        name: 'choices',
        message: chalk.magentaBright('What would you like to do?'),
        choices: list
    })
    .then(({choices}) => actionProcessing(choices))
    .catch(error => console.error(error))
}
init(0)