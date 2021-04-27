const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const userApi = require("./userApi")
const messageApi = require("./messageApi")
const app = express();

//Setup app
app.use((req, res, next) => {
    console.log(`Incoming ${req.protocol}, type ${req.method}, to ${req.path}`)
    next()
})
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));
app.use("/api/users", userApi)
app.use("/api/messages", messageApi)



//Since im not using the server part of parcel(just the bundling) i need to be able to serve the files.
app.use((req, res, next)=>{
    if(req.method !== "GET" || req.path.startsWith("/api")){
        return next();
    }
    //Since im going to use React router, should return index.html on every endpoint except '/api'
    return res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"))
})

const port = 3000
const server = app.listen(port, ()=>{
    console.log(`Server live på port: ${port}`)
    server.on("upgrade", (req, res, head) => {
        messageApi.handleWsUpgrade(req, res, head)
    })
})
