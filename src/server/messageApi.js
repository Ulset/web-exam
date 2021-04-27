const express = require("express");
let messageApi = express.Router()

const ws = require("ws")
const userApi = require("./userApi");

const wsServer = new ws.Server({noServer: true})

//Populated by incoming messages
let messages = []

//Sockets used by Websocket
let sockets = []

const add_to_db = ({senderId, recipientId, message, private_message}) =>{
    if(!senderId || !message){
        console.log("LAGT MELDING TIL I DB UTEN ALL INFO, kan føre til undefined errorsssss")
    }
    messages.push({senderId, recipientId, message, private_message})
    console.log(messages)
}

messageApi.post("", ((req, res) => {
    //Add a new message thread.
    add_to_db({
        ...req.body,
        private_message: true
    })
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

    //Adds the firstname and lastname
    const userMessagesWithNames = userMessages.map(el => {
        const {firstname, lastname} = userApi.getUserObjById(el.senderId)
        return {...el, firstname, lastname}
    })

    res.json(userMessagesWithNames)
}))

messageApi.handleWsUpgrade = (req, res, head) => {
    wsServer.handleUpgrade(req, res, head, (socket)=>{
        wsServer.emit("connection", socket, req)
    })
}

wsServer.on('connection', socket => {
    console.log("kobla til")
    socket.on("message", (data) => {
        console.log("Client:", data)
        //The client will send over which userId is using this socket (to support private messages)
        if(data.substr(0, 6) === "USERID"){
            const socket_user_id = parseInt(data.substr(7))
            sockets.push({id: socket_user_id, socket})
            return
        }

        //If the data is not a plain 'USERID XX' connect message, is JSON object stringified.
        // This is an actual message and should be broadcasted and saved in DB
        const {message, id, firstname, lastname} = JSON.parse(data)
        add_to_db({senderId: id, message, private_message: false})
        for(let socketEl of sockets){
            const {socket} = socketEl
            const data = JSON.stringify({firstname, lastname, message, private_message:true})
            socket.send(data)
        }
    })
})


module.exports = messageApi