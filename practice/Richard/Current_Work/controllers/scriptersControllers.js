const {createScripterValidation} = require("../validation/scripterValidation");
const {createScripterService} = require("../services/scriptersServices")

/*  ------- Function Handlers ------- */

function createScripterController (req, res) {
    //Created an array with user input (Used for Validation)
    
    if (!createScripterValidation(req)){
        return res.send('Not a valid input').status(403)
    }
     
    createScripterService(req);
 
     // Response message back to the user (in Postman)
     res.send(`Scipter Created: \n User ${req.body.firstName} ${req.body.lastName} inserted into the table 'scripters'`)
 }

 module.exports = {createScripterController }