const express = require('express'); // importing and using express 
const app = express(); // Creating an instance of express
const scripter = require('./routes/scripters');

const connection = require('./models/connection');

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
app.use(scripter)

// POST uses user input (JSON) and populate the database using MySql Commands





