const mysql = require('mysql')

const db = mysql.createPool({
    user:process.env.mysql_username,
    host:process.env.mysql_host,
    password:process.env.mysql_password,
    database:process.env.myql_database
})

module.exports = db