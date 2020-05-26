const chalk = require('chalk')

const listDept = []

// A recursive function that find an index of each department/role in the department list
let findIndex = (type,deptVal, roleVal,index) =>
{
  
    switch(type)
    {
        case 'department':
            return (listDept[index] !== undefined) ? 
            ((listDept[index].getName() === deptVal) ? index : findIndex(type,deptVal,roleVal,++index)) : false ;
        case 'role':
            let deptIndex = findIndex("department",deptVal,roleVal,0)
            return (listDept[deptIndex]
            .role[index] !== undefined) ? 
            ((listDept[deptIndex].role[index].getTitle() === roleVal) ? index : findIndex(type,deptVal,roleVal,++index)) : false ;
    }
   
}

// Add new department
let addDept = (data) =>
{
        listDept.push(data)
}

// Add new role
const addRole = (deptName,id,role,salary) =>
{
    listDept[findIndex("department",deptName,null,0)].addRole(id,role,salary)
}

const addEmployee = (deptName,role,id,fName,lName,managerId) =>
{   let deptIndex = findIndex('department',deptName,null,0)

    if(deptIndex)
    {
        listDept[deptIndex].role[findIndex("role",deptName,role,0)].addEmployee(id,fName,lName,managerId)
    }
    else{
        console.log(chalk.redBright(`Department ${deptName} not found`))
    }
    
}

// addDept(new dept(1,"Sales"))
// addDept(new dept(2,"WholeSale"))
// addRole('WholeSale',1,"Reverse Engineer",333)
// addRole('WholeSale',2,"Engineer",444)
// addRole('WholeSale',3,"Fullstack developer",555)
// addEmployee("WholeSale","Engineer",1,"Tim","Nguyen",null)
// addEmployee("WholeSale","Reverse Engineer",2,"Mike","Nguyen",1)
// // console.log(findIndex("WholeSale",0))
// console.log(listDept[findIndex("department","WholeSale",null,0)].role[findIndex("role","WholeSale","Reverse Engineer",0)])
module.exports = findIndex
module.exports = addDept(arg1,arg2)
// module.exports = addRole
// module.exports = addEmployee