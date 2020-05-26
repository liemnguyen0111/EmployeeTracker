const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: process.env.myU,
  password: process.env.myK,
  database: process.env.myDB
})

module.exports = db