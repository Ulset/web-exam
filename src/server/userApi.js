const express = require("express");
let userApi = express.Router()
const fetch = require('node-fetch')

async function fetchJson(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}

//Siden brukere autenfiseres i frontend, brukes 'databasen' bare for å holde styr på hvem du kan chatte med.
let users = [
    {"id": 1, "firstname": "Testmann", "lastname": "Testmannson", "email": "sanderulset@gmail.com"}
]

userApi.get("", ((req, res) => {
    res.json(users)
}))

userApi.get("/profile/:auth_token", async (req, res) => {
    const a_token = req.params.auth_token;
    const {userinfo_endpoint} = await fetchJson("https://accounts.google.com/.well-known/openid-configuration")
    const {given_name, family_name, email} = await fetchJson(userinfo_endpoint, {headers: {Authorization: a_token}})

    let exists_in_db = false;
    for(let el of users){
        if(el.firstname === given_name && el.lastname === family_name){
            exists_in_db = true;
        }
    }

    if(!exists_in_db){
        users.push({"id": users.length+1, "firstname": given_name, "lastname":family_name, email})
    }
    res.status(200).json({"firstname": given_name, "lastname":family_name, email})
})


module.exports = userApi