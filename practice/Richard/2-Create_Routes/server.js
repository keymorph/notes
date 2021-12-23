const express = require('express') // importing and using express 
const app = express(); // Creating an instance of express


const port = 4629; // port where the server lives

app.listen(port, function(){console.log(`Server listening on port ${port}`)}); // Opening the server on port

app.use(express.json())  // parse incoming JSON data to javascript
app.use(express.urlencoded({extended: true}))


app.get('/', function(req, res){ // Making a request to the base url (path), where the api resides
    res.send("Hello"); //Sending a response to the path
})

app.get("/pineappel", function(req,res){ //type of request (GET) | path where API lives (pineappel)| function to Handle the request [function(request,response)] 
    res.send("Richard");
})

app.get('/timesfive', function(req, res){ //take a number from user, multiply by 5
    console.log(req.body.number);
    let result = req.body.number * 5;
    res.send(JSON.stringify(result)); //send does not accept integers
})