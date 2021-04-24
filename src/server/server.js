const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//Setup app
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/test", (req, res)=>{
    res.status(200).send("test")
})


const port = 8000
app.listen(port, ()=>{
    console.log(`Server live på port: ${port}`)
})