const express = require('express'); // import express module
const app = express();  // Create an instance of the express module
const bodyParser = require('body-parser'); // Processes JSON to string

// User APIs
const register = require("./APIs/users/register");
const login = require("./APIs/users/login");
const deleteUser = require("./APIs/users/deleteUser");

// Note APIs
const createNote = require("./APIs/notes/createNote");
const editNote = require("./APIs/notes/editNote");
const deleteNote = require("./APIs/notes/deleteNote");
const showNotes = require("./APIs/notes/showNotes");

const connection = require("./connection") // Connect to Mysql Server (on GCP VM)
const dotenv = require('dotenv'); // JWT Signature
const cors = require("cors");

// Read the .env file for the enviromental variables
// Allows server-wise access
dotenv.config();

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
app.use(cors());

app.use('/api/', register);
app.use('/api/', login);
app.use('/api/', deleteUser);
app.use('/api/', createNote);
app.use('/api/', editNote);
app.use('/api/', deleteNote);
app.use('/api/', showNotes);

module.exports = {connection}