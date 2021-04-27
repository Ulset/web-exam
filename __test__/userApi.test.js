const bodyParser = require("body-parser");
const request = require("supertest")
const express = require("express")
const userApi = require("../src/server/userApi");

const app = express();

app.use(bodyParser.json());
app.use(userApi)

it("Can create a message", async ()=>{
    await request(app).get("").then(r => {
        const userEmail = r.body.map(el => el.email)
        expect(userEmail).toContain("jeg@finnes.ikke")
    })
})

it("Can tell you your token is expired", async ()=>{
    await request(app).get("/profile/jabadababadTokenYa").then(r => {
        expect(r.status).toEqual(401)
        expect(r.text).toEqual("Bad token")
    })
})