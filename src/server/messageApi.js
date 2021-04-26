const express = require("express");
let messageApi = express.Router()
const fetch = require('node-fetch')


//Populated by incoming messages
let messages = []

messageApi.post("", ((req, res) => {
    messages.push(req.body)
    console.log(messages)
    res.status(201).send()
}))



module.exports = messageApi