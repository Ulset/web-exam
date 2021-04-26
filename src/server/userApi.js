const express = require("express");
let userApi = express.Router()

let users = [
    {"id": 1, "firstname": "Sander", "lastname": "Ulset", "email": "sanderulset@gmail.com"}
]

userApi.get("", ((req, res) => {
    res.json(users)
}))

module.exports = userApi