const orm = require('../orm')

module.exports = {

   viewAllemployee () {
    return orm.getAllEmployee()
  },

  viewEmployeeByDept (department) {
    return orm.getAllEmployeeByDepartment(department)
  },

  viewEmployeeByManager (id) {
    return orm.getAllEmployeeManager(id)
  },

  viewTable (table) {
    return orm.getTable(table)
  },
  addEmployee(employee)
  {
    //   console.log(employee)
    orm.add("employee",employee)
  },
  getManager()
  {
      return orm.getManager()
  }
}
