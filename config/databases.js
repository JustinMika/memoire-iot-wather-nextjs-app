const mysql = require('mysql2/promise')

const databases = mysql.createPool({
   host: process.env.DB_HOST || 'localhost',
   user: process.env.DB_USER || 'root',
   password: process.env.DB_PASSWORD || '',
   database: process.env.DATABASE || 'meteo-app'
})

module.exports = databases
