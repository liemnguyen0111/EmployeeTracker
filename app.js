const chalk = require('chalk')
const logTable = require('console.table')
const {prompt} = require('inquirer')
const cc = require('currency-formatter')
cc.findCurrency('USD').decimalDigits = 0
cc.findCurrency('USD').spaceBetweenAmountAndSymbol = true
const {employee, department, role} = require('./controller')


// // View function allow user to view the information depend on the call
 let view = async (message) =>
{
    let data = 0
    if(message.slice(1,3).join(' ') === 'all roles'){
        data = await employee.viewTable("role")
        data[0] = data[0].map(key => ({id : key.id, title : key.title, salary : `${ cc.format(key.salary, { code: 'USD'}) }`}))    
    }
    else { message.splice(0,3) }
    if(message.join(' ') === 'By Manager') 
    {
        let manager = await employee.getManager()
        let temp = 0
        if(manager[0].length > 0) {
        let {managerId} = await prompt({
            type: 'list',
            name: 'managerId',
            message : 'Please select a manager from the list:',
            choices : manager[0].map(({name, value}) => ({name,value}))
        })
        temp = managerId
        }
       data = await employee.viewEmployeeByManager(temp) 
        
    
    }
    else if(message.join(' ') === 'By Department') 
    {
        let dept = await department.getDepartment()
        const {input} = await prompt(
            {
                type: 'list',
                name: 'input',
                message : 'Please select a department you want to view: ',
                choices : dept[0].map(({name}) => ({name})) 
            }
        )

        data = await employee.viewEmployeeByDept(`${input}`)
    }
    else if (message.length === 0) 
    { 
        data = await employee.viewAllemployee()
        data[0].forEach(item => (item.salary =`${ cc.format(item.salary, { code: 'USD'}) }` ))
    }
    if(data[0].length > 0) {console.table(data[0])}
    else {console.log(chalk.redBright(`X NOT FOUND - TABLE EMPTY X`))}

    init()
}

// Add role
let addRole = async () =>
{
    let dpChoices = await department.getDepartment()
    dpChoices = dpChoices[0].map( ({id, name}) =>({name : name , value : id}))

    const newRole = await prompt( 
        [  {
            type : 'list',
            name : 'department_id',
            message : 'Please select a department you want to add new role to:',
            choices : dpChoices
        },
        {
            name: 'title',
            message : 'Please input the role title: '
        },
        {
            name : 'salary',
            message : 'Please input the salary for this role: '
        }]
    )

    role.addRole(newRole)

    console.log(chalk.greenBright(`New title: ${newRole.title} has been added sucessfully!`))
}

// Add department
let addDepartment = async () =>
{
    let newDept = await prompt(
        {
            name: 'name',
            message : "Please input name of the new department: "
        }
    )

    department.addDepartment(newDept)

    console.log(chalk.greenBright(`${newDept.name} has been added sucessfully!`))
}

// Add employee
let addEmployee = async () =>
{
    let dpChoices = await department.getDepartment()

    let rChoices = await role.getRole()

    let mChoices = await employee.viewTable("employee")
    
    dpChoices = dpChoices[0].map( ({id, name}) =>({name : name , value : id}))

    let a = (input) => { rChoices = rChoices[0].filter(({department_id}) =>{return department_id === input}).map(({id, title}) =>({name : title, value : id}))
    choice[1] = rChoices
    }
    
    mChoices = mChoices[0].map(({first_name,last_name,id}) => ({name: `${last_name} ${first_name}`, value: id}))
    mChoices.unshift({name : "None", value : null})

   const questions = ["Which department are you in ? ", "What is your role ?","Who is your manager ? ","Please enter your first name: ", "Please enter your last name: "]

   const name = ["department_id", "role_id", "manager_id","first_name", "last_name"]

   let info = {}
   let choice = [dpChoices,rChoices,mChoices]

   for(let i = 0; i < 3; i++)
   {
      const {input} = await prompt({
           type : 'list',
           name : 'input',
           message : questions[i],
           choices : choice[i]
        })
        
    let temp = (i === 0)? a(input) :  (info[name[i]] = input);
   }

   for(let i = 3; i < questions.length; i++)
   {
         const {input}= await prompt({
                name : 'input',
                message : questions[i]
            })

        info[name[i]]  = input   
   }

    await employee.addEmployee(info)
    console.log(chalk.greenBright(`Employee ${info.last_name + " " + info.first_name} has been added sucessfully!`))
}

// Add function allow user to add data such as role, employee and department
let add = async (message) =>
{   let data
    if(message.join(' ') === "Add Employee"){await addEmployee()}
    if(message.join(' ') === "Add Role"){ await addRole()}
    if(message.join(' ') === "Add Department"){ await addDepartment() }

    init()
}

// Update function allow user to update data such as role, employee and department

// Remove function allow user to remove data from database
let remove = async (message) =>
{
    let deptList = await department.getDepartment()
    console.log(deptList)
    const {departmentId, confirm} = await prompt(
        [
            {
                type : 'list',
                name : 'departmentId',
                message : 'Please select a department you want to remove - WARNING-> ALL THE DATA THAT BELONG TO THE DEPARTMENT WILL BE DELETED',
                choices : deptList[0].map( ({id, name}) => ({name, value : id}))
            },
            {
                type : 'list',
                name : 'confirm',
                message : 'Please confirm again before process: ',
                choices : [{name : 'CONFIRM', value : 1}, {name : "CANCEL", value : 0}]
            }
        ]
    
    )
    if(confirm)
    {
        department.deleteDepartment({id : departmentId})
        console.log(chalk.greenBright("DEPARTMENT SUCESSFULLY DELETED!"))
    }
    else
    {
        console.log(chalk.redBright("Process cancel"))
    }
    init()
}


// Process user choice
const actionProcessing =  (message) =>
{
    message = message.split(' ')
     switch(message[0])
    {
        case 'View':  
            view(message)
            break
        case 'Add':
            add(message)
            break
        case 'Remove':
            console.log('Remove')
            remove(message)
            break
        case 'Update':
            console.log('Update')
           
            break
        case 'Exit':      
                console.log("Bye")
                process.exit()
        .catch(err => console.log(err))  
            break
    }
}


let init = () =>
{
    // Choices list
    const list = [
        "View All Employees", "View All Employees By Department", 
        "View All Employees By Manager", "View all roles", 
        "Add Employee", "Add Role","Add Department",
        "Update Employee Role", "Update Employee Manager",
        "Remove Employee", "Remove Role", "Remove Department", "Exit"]
    
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

init()