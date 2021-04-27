import React from 'react'
import ReactDom from 'react-dom'
import Application from "./Application";

const userApi = {
    listUsers: async () => {
        let resp = await fetch("/api/users");
        return await resp.json()
    },
    getProfileData: async (userToken) => {
        let resp = await fetch("/api/users/profile/" + userToken)
        if(resp.status === 401){
            return "Switch token";
        }
        return await resp.json()
    }
}

const messageApi = {
    send_new_message: async (senderId, recipientId, message) => {
        return await fetch("/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({senderId, recipientId, message}),
        })
    },
    getUserMessages: async (userId) => {
        let resp = await fetch("/api/messages/"+userId)
        return await resp.json()
    }
}

ReactDom.render(<Application userApi={userApi} messageApi={messageApi}/>, document.getElementById("app"))