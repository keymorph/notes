const express = require('express');
const router = express.Router();


let isEven = (req,res,next) => { //Middleware: containing same params as handler
    if(req.body.number % 2 == 0) { //Determines whether to proceed to 'next' param
        next() // goes to next parameter in GET function
    } 
    else {
        res.send("Not Even") //Result is not even; send response back to api
    }
}

router.get("/timesfive", isEven, function(req, res, next){ // (path, middleware, handler)
    const result = req.body.number * 5;
    res.send(`${result}`);
    
})


module.exports = router;// Old version of export default router

