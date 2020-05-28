const orm = require('../orm')

module.exports = {

  getDepartment()
  {
      return orm.getTable('department')
  },

  addDepartment(data)
  {
      orm.add('department',data)
  },

  deleteDepartment(data)
  {
      orm.delete('department',data)
  }
}
