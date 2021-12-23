const mysql = require('mysql');

let connection = mysql.createConnection({
    host: '34.70.215.72',
    port: 3306,
    user: 'fourscript',
    password: 'dertmern*4s',
    database: 'test'

});

module.exports = connection;