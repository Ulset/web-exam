const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

//Setup app
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use(express.json());

//Since im not using the server part of parcel(just the bundling) i need to be able to serve the files.
app.use((req, res, next)=>{
    if(req.method !== "GET" || req.path.startsWith("/api")){
        return next();
    }

    return res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"))
})

app.get("/test", (req, res)=>{
    res.status(200).send("test")
})


const port = 8000
app.listen(port, ()=>{
    console.log(`Server live på port: ${port}`)
})