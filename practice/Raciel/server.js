const express = require("express"); // importing and using express 
const app = express(); // Creating an instance of express

const port = 4629;

app.listen(port, function(){console.log(`Server listening on port ${port}`)}); // Opening the server on port

app.get('/', function(req, res){ // Making a request to the base url (path)
    res.send("Hello"); //Sending a response to the path
})

