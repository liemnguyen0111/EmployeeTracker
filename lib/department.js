const role = require('./role')

class department 
{
    constructor(id,name,roleId,title,salary,empId,fName,lName,managerId)
    {
      
        this.id = id;
        this.name = name;
        this.role = []
    }

    getDepartmentId()
    {
        return this.id
    }

    getName()
    {
        return this.name
    }

    addRole(id,title,salary)
    {
        this.role.push(new role(id,title,salary,this.id))
    }
}

module.exports = department