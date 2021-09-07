const express = require('express'); // import express module
const app = express();  // Create an instance of the express module
var mysql = require('mysql'); // import mysql module

// Configure a connection to the MySQL database remotely

var connection = mysql.createConnection({
    host: '34.121.6.252',  // IP of google cloud vm 
    user: 'fourscript',
    password: 'dertmern*4s',
    port:  3306,
    database:"jotfox"
})

// Start server on port 5000 locally
app.listen(5000, () => console.log("Listening to port 5000..."));

// Connect to The MySQL database
connection.connect((err) => {
    if(err){
        console.log(err)
        throw err;
    }


    connection.query(`SHOW TABLES;`, (err, results) => {
        if (err) throw err;
        console.log(results)
    })


    console.log("MySql Connected...");
})



