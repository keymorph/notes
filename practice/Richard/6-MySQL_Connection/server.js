const express = require('express'); // importing and using express 
const app = express(); // Creating an instance of express
const mysql = require('mysql'); // importing mysql to utilize its database functions

// Create a connection using the Google Cloud Platform  mySQL database
let connection = mysql.createConnection({ 
    host: '34.70.215.72', //GCP IP address
    port: 3306, //Port where the mySQL lives on the GCP server
    user: 'fourscript',
    password: 'dertmern*4s',
    database: 'test'
})

connection.connect(function(err){ //Function error handler; if error is found, print [throw] error
    if (err) 
        throw err;
     
    console.log("MySql Connected");
}); // Bind the dependencies/ start the connection

const port = 4629;

app.listen(port, function(){console.log(`Server listening on port ${port}`)}); // Opening the server on port

/* ******* Middlewares ******* */
app.use(express.json()) // No idea what this is
app.use(express.urlencoded({extended: true})) //No idea what this is

// POST uses user input (JSON) and populate the database using MySql Commands
app.post('/fourscripters', function(req,res){
    connection.query( // forming a statement to make changes in the database
        `INSERT INTO scripters (firstName, lastName, study, github) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.study}', '${req.body.github}' )`,
        function(err, row){ // handles error
            if(err) throw err;
            
            //Prints in terminal
            console.log(`User ${req.body.firstName} ${req.body.lastName} inserted into the table 'scripters'`); 
        }

        
    );
    // Response message back to the user (in Postman)
    res.send(`Scipter Created: \n User ${req.body.firstName} ${req.body.lastName} inserted into the table 'scripters'`)
})




