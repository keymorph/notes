const express = require('express');
const router = express.Router();


let isEven = (req,res,next) => { //Middleware: containing same params as handler
    if(req.body.number % 2 == 0) {
        next() // goes to next parameter in GET function
    } 
    else {
        res.send("Not Even")
    }
}

module.exports = router.get("/timesfive", isEven, function(req, res, next){
    const result = req.body.number * 5;
    res.send(`${result}`);
    
})




