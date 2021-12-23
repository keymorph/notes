const express = require('express') // importing and using express 
const app = express(); // Creating an instance of express
const pineappel = require('./APIs/pineappel')
const timesfive = require('./APIs/timesfive');

const port = 4629;

app.listen(port, function(){console.log(`Server listening on port ${port}`)}); // Opening the server on port

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use(timesfive);  //using timefive API
app.use('/api/',pineappel) //using the API from pineappel.js

