class employee
{
    constructor(id,fName,lName,roleId,managerId)
    {
        this.id = id
        this.fName = fName
        this.lName = lName
        this.roleId = roleId
        this.managerId = managerId
    }

    getID()
    {
        return this.id
    }

    getfName()
    {
        return this.fName
    }

    getlName()
    {
        return this.lName
    }

    getRoleID()
    {
        return this.roleId
    }

    getManagerId()
    {
        return this.managerId
    }
}

module.exports = employee