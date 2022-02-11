import mysql from 'mysql'

const database = mysql.createConnection({
    host: '34.70.215.72',
    user: 'fourscript', 
    password: 'dertmern*4s',
    port: 3306,
    database: 'jotfox',
})

export default database