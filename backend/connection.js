var mysql = require('mysql'); // import mysql module

// Configure a connection to the MySQL database remotely
const connection = mysql.createConnection({
    host: '34.70.215.72',  // IP of google cloud vm 
    user: 'fourscript',
    password: 'dertmern*4s',
    port: 3306,
    database: "jotfox"
})

module.exports = connection;