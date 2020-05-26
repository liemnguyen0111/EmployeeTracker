const employee = require('./employee')

class role 
{
    constructor(id,title,salary,departmentId)
    {
        this.id = id 
        this.title = title
        this.salary = salary
        this.departmentId = departmentId
        this.employee = []
    }

    getRoleId()
    {
        return this.id
    }

    getTitle()
    {
        return this.title
    }

    getSalary()
    {
        return this.salary
    }

    getDepartmentId()
    {
        return this.departmentId
    }

    addEmployee(id,fName,lName,managerId)
    {
        this.employee.push(new employee(id,fName,lName,this.id,managerId))
    }
}

module.exports = role