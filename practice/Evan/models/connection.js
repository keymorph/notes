import mysql from 'mysql'

// Configure a connection to the MySQL database remotely
const connection = mysql.createConnection({
    host: '34.70.215.72',  // IP of google cloud vm 
    user: 'fourscript', 
    password: 'dertmern*4s',
    port: 3306, //port for mySql database on our cloud server
    database: 'jotfox'
})

export default connection