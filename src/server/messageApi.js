const express = require("express");
let messageApi = express.Router()

const ws = require("ws")

const wsServer = new ws.Server({noServer: true})


//Populated by incoming messages
let messages = []

messageApi.post("", ((req, res) => {
    //Add a new message thread.
    messages.push(req.body)
    console.log(messages)
    res.status(201).send()
}))

messageApi.handleWsUpgrade = (req, res, head) => {
    console.log("Upgrade")
    wsServer.handleUpgrade(req, res, head, (socket)=>{
        wsServer.emit("connection", socket, req)
    })
}

wsServer.on("connection", (socket) => {
    console.log("kobla til")
    socket.on("message", message => console.log(message))
})


module.exports = messageApi