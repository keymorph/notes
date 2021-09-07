const express = require('express'); // import express module
const app = express();  // Create an instance of the express module
const bodyParser = require('body-parser');
const register = require("./APIs/register");
const connection = require("./connection")



// Start server on port 5000 locally
app.listen(5000, () => console.log("Listening to port 5000..."));

// Connect to The MySQL database
connection.connect((err) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log("MySql Connected...");
})


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.use('/api/', register);

module.exports = {connection}




