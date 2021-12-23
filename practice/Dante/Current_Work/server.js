const express = require("express");
const app = express();

app.listen(5252, ()=>{
    console.log("listening to port: 5252")
})

app.use(express.json()) 
app.use(express.urlencoded({extended: true})) 

app.post("/test", (req, res)=> {
    res.send("yo")
})