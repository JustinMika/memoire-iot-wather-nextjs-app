require('dotenv').config()
// const mysql = require('mysql2')
const mysql = require('mysql2/promise')

// Créer la connexion à la base de données
const databases = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DATABASE || 'test'
})

// Exporter la connexion pour l'utiliser dans d'autres fichiers
module.exports = databases
