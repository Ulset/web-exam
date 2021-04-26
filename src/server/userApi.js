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
const get_user_obj = (email) =>{
    let index = users.map(el => el.email).indexOf(email)
    return users[index]
}

userApi.get("", ((req, res) => {
    res.json(users)
}))

userApi.get("/profile/:auth_token", async (req, res) => {
    const a_token = req.params.auth_token;
    const {userinfo_endpoint} = await fetchJson("https://accounts.google.com/.well-known/openid-configuration")
    const {given_name, family_name, email} = await fetchJson(userinfo_endpoint, {headers: {Authorization: a_token}})

    //If the user is not in the DB, add
    let exists_in_db = false;
    for(let el of users){
        if(el.firstname === given_name && el.lastname === family_name && el.email === email){
            exists_in_db = true;
        }
    }
    if(!exists_in_db){
        users.push({"id": users.length+1, "firstname": given_name, "lastname":family_name, email})
    }

    //To keep things organized need to return the whole user object. (So ID and stuff like that is also sent)
    res.status(200).json(get_user_obj(email))
})


module.exports = userApi