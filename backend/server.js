const express = require('express'); // import express module
const app = express();  // Create an instance of the express module
const bodyParser = require('body-parser'); // Processes JSON to string

// Note APIs
const note = require('./api/routes/note')

// User APIs
const user = require('./api/routes/user')

const connection = require("./api/models/connection") // Connect to Mysql Server (on GCP VM)
const dotenv = require('dotenv'); // JWT Signature
const cors = require("cors");

// Read the .env file for the enviromental variables
// Allows server-wise access
dotenv.config();

// Start server on port 5000 locally
app.listen(8000, () => console.log("Listening to port 8000..."));

// Connect to The MySQL database
connection.connect((err) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log("MySql Connected...");
})

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());


app.use('/api/', user);
app.use('/api/', note);

module.exports = {connection}
