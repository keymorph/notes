const express = require('express') // importing and using express 
const app = express(); // Creating an instance of express


const port = 4629; // port where the server lives

app.listen(port, function(){console.log(`Server listening on port ${port}`)}); // Opening the server on port

