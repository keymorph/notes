// import express from "express";
const express = require("express");
const router = express.Router();


router.get("/pineappel", function(req, res){
    res.send("Richard");
})

module.exports = router; // alias to export default router