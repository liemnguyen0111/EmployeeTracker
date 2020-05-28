const orm = require('../orm')

module.exports = {

  getRole()
  {
      return orm.getTable('role')
  },

  addRole(data)
  {
      orm.add('role', data)
  }
}
