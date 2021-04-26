const express = require("express");
let userApi = express.Router()

let users = [
    {"id": 1, "firstname": "Sander", "lastname": "Ulset", "email": "sanderulset@gmail.com"}
]

userApi.get("", ((req, res) => {
    res.json(users)
}))

userApi.post("", ((req, res) => {
    const {firstname, lastname, email} = req.body
    users.push({
        id: users.length+1,
        firstname,
        lastname,
        email
    })
    res.status(201)
}))
module.exports = userApi