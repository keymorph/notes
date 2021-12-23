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


app.use('/api/',pineappel) //using the API from pineappel.js
app.use(timesfive); //using timefive API


//Using different methods (requests) with the same url path 
app.post('/note', function(req,res){ 
    res.send("Note Created");
})

app.get('/note', function(req,res){
    res.send("Note Retreived");
})

app.delete('/note', function(req,res){
    res.send("Note Deleted");
})

