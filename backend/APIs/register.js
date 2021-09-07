const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var mysql = require('mysql'); // import mysql module
const connection = require('../connection');


 


router.post('/register', async (req, res) => {

    console.log(connection)


    try {
        console.log("IM HERE")

        connection.query(`INSERT INTO users (email, password) VALUES ('${req.body.email}', '${req.body.password}');`, (err, results) => {
            if (err) throw err;
            console.log(results)
        })
       
        res.send("hello")

    } catch (err) {
        res.send("err")

    }

})

module.exports = router;