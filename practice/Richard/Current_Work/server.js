const express = require('express'); // importing and using express 
const app = express(); // Creating an instance of express
const scripter = require('./routes/scripters');
const bcrypt = require('bcrypt')

const connection = require('./models/connection');

connection.connect(function (err) { //Function error handler; if error is found, print [throw] error
    if (err)
        throw err;

    console.log("MySql Connected");
}); // Bind the dependencies/ start the connection

const port = 4629;

app.listen(port, function () { console.log(`Server listening on port ${port}`) }); // Opening the server on port

/* ******* Middlewares ******* */
app.use(express.json()) // No idea what this is
app.use(express.urlencoded({ extended: true })) //No idea what this is
app.use(scripter)

/**                              */

app.post('/register', function (req, res) {

    const saltRounds = 10; //The amount of rounds of encryption

    const { username, password } = req.body; //Destructuring keys from body 

    //bcrypt
    bcrypt.hash(password, saltRounds) // Hashes password
    .then(function (crypted) {  //Insert variables into database

        connection.query(
            `INSERT INTO accounts (username,password) VALUES ('${username}','${crypted}');`,
            function (err) {
                if(err) throw err;
        
                res.send(`User ${username} has been imported in the database`);
            }
        )
    })

   

    
})