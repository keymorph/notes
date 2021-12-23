const connection = require('../models/connection')

function createScripterService (req) {
    connection.query( // forming a statement to make changes in the database
        `INSERT INTO scripters (firstName, lastName, study, github) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.study}', '${req.body.github}' )`,
        function(err, row) { // handles error
            if (err) throw err;
            
            //Prints in terminal
            console.log(`User ${req.body.firstName} ${req.body.lastName} inserted into the table 'scripters'`); 
        }
    );
}

module.exports = {createScripterService}