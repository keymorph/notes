const express = require('express') // importing and using express 
const app = express(); // Creating an instance of express
const pineappel = require('./APIs/pineappel')
const timesfive = require('./APIs/timesfive');

const port = 4629;

app.listen(port, function(){console.log(`Server listening on port ${port}`)}); // Opening the server on port

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use((req,res,next)=>{
    console.log(req.body);
    next();
})



app.use(timesfive);
app.use('/api/',pineappel) //using the API from pineappel.js
 //using timefive API

// app.get('/', function(req, res){ // Making a request to the base url (path), where the api resides
//     res.send("Hello"); //Sending a response to the path
// })

// app.get("/pineappel", function(req,res){ //type of request (GET) | path where API lives (pineappel)| function to Handle the request [function(request,response)]
    
//     res.send(req.params);
// })

// app.get('/timesfive', function(req, res){ //take a number from user, multiply by 5
//     console.log(req.body.number);
//     let result = req.body.number * 5;
//     res.send(JSON.stringify(result)); //send does not accept integers
// })