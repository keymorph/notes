const express = require('express');
const router = express.Router();
const {createScripterController} = require('../controllers/scriptersControllers')

const connection = require('../models/connection');

router.get('/scripters', function(req, res) {

})

router.post('/scripters', createScripterController)


router.delete('/scripters', function(req, res) {
 
})

router.put('/scripters', function(req, res){

})

module.exports = router;