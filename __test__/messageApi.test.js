const bodyParser = require("body-parser");
const request = require("supertest")
const express = require("express")
const messageApi = require("../src/server/messageApi");
const {users} = require("./testHelpers")

const app = express();

app.use(bodyParser.json());
app.use(messageApi)

it("Can create a message", async ()=>{
    const user1 = users[0]
    const user2 = users[1]
    const testMessage = "Test"
    await request(app).post("").send({
        senderId: user1.id,
        recipientId: user2.id,
        message: testMessage
    }).expect(201)

    await request(app).get("/"+user1.id).then(r => {
        const justMessagesTextArray = r.body.map(el => el.message)
        expect(justMessagesTextArray).toContain(testMessage)
    })
})