const express = require('express');
const router = express.Router(); 




router.get("/timesfive", function(req, res, next){ // (path, handler)
    const result = req.body.number * 5;
    res.send(`${result}`);
    
})


module.exports = router;// Old version of export default router

