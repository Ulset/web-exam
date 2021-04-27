const express = require("express");
let messageApi = express.Router()

const ws = require("ws")

const wsServer = new ws.Server({noServer: true})


//Populated by incoming messages
let messages = []

messageApi.post("", ((req, res) => {
    //Add a new message thread.
    messages.push({
        ...req.body,
        private_message: true
    })
    console.log(messages)
    res.status(201).send()
}))

messageApi.get("/:id", ((req, res) => {
    //Returns every message this user is apart of
    //The id argument is the current user
    let userId = parseInt(req.params.id)

    //Finds messages that this user is part of OR is not a private message.
    const userMessages = messages.filter(mesEl => {
        const {senderId, recipientId, private_message} = mesEl
        return !private_message || senderId === userId || recipientId === userId
    })

    res.json(userMessages)
}))

messageApi.handleWsUpgrade = (req, res, head) => {
    wsServer.handleUpgrade(req, res, head, (socket)=>{
        wsServer.emit("connection", socket, req)
    })
}

wsServer.on('connection', socket => {
    console.log("kobla til")
    socket.on("message", message => {
        //TODO Logikk for når en ny melding kommer inn
    })
})


module.exports = messageApi