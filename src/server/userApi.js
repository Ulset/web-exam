const express = require("express");
let userApi = express.Router()
const fetch = require('node-fetch')

//Siden brukere autenfiseres i frontend, brukes 'databasen' bare for å holde styr på hvem du kan chatte med.
let users = [
    {"id": 1, "firstname": "Testmann", "lastname": "TestPrivatMeldingson", "email": "jeg@finnes.ikke"}
]

//Helper functions
userApi.getUserObjByEmail = email => users.find((el) => el.email === email)
userApi.getUserObjById = id => users.find((el) => el.id === id)

//Empty get request to the path ('/api/users') will return the whole user object.
userApi.get("", ((req, res) => {
    res.json(users)
}))

//Returns profile info by the supplied Google token.
userApi.get("/profile/:auth_token", async (req, res) => {
    const a_token = req.params.auth_token;
    const endpoint_res = await fetch("https://accounts.google.com/.well-known/openid-configuration")

    // noinspection JSUnresolvedFunction
    const {userinfo_endpoint} = await endpoint_res.json()
    const userinfo_res = await fetch(userinfo_endpoint, {headers: {Authorization: a_token}})
    if(userinfo_res.status === 401){
        //The token is expired and needs to be switched.
        res.status(401).send("Bad token")
        return
    }
    // noinspection JSUnresolvedFunction
    const {given_name, family_name, email} = await userinfo_res.json()

    //If the user is not in the DB, add to list of users.
    let exists_in_db = users.find(el => {
        return el.firstname === given_name && el.lastname === family_name && el.email === email
    });
    if(!exists_in_db){
        users.push({"id": users.length+1, "firstname": given_name, "lastname":family_name, email})
    }

    //To keep things organized need to return the whole user object. (So ID and stuff like that is also sent)
    res.status(200).json(userApi.getUserObjByEmail(email))
})


module.exports = userApi