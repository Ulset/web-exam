import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom'
import {Route, Switch, useHistory} from "react-router";
import {BrowserRouter} from "react-router-dom";
import LoginHandler from "./LoginHandler";
import {App} from "./App";

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

function Index({userApi, messageApi}) {
    /*The top level of this react app*/

    const [userToken, setUserToken] = useState("");
    const [userData, setUserData] = useState()
    if(!userToken){
        //If there is no userToken, see if one is saved in localstorage.
        const userToken_stored = localStorage.getItem("userToken")
        if(userToken_stored){
            //If found, use this as userToken.
            setUserToken(userToken_stored)
        }
    }
    useEffect(() => {
        //If a user token is supplied but no userData is available, ask server who this person is.
        if (!userData && userToken) {
            userApi.getProfileData(userToken).then(data => {
                if(data === "Switch token"){
                    //Too little time to do this better, a Google token only lasts for 1 hour, so need to switch sometimes
                    localStorage.clear()
                    window.location.reload()
                }else{
                    setUserData(data)
                }
            })
        }
        if(userToken){
            //Every time the userToken is changed (and is something), set this as the userToken in localstorage.
            localStorage.setItem("userToken", userToken)
        }
    }, [userToken])
    //Main return statement. App component will automatically redirect to /login if no userToken is supplied.
    return <div>
        <BrowserRouter>
            <Switch>
                <Route path={'/login'}>
                    <LoginHandler setUserToken={setUserToken} userToken={userToken}/>
                </Route>
                <Route>
                    <App userToken={userToken} userApi={userApi} messageApi={messageApi} userData={userData}/>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
}

ReactDom.render(<Index userApi={userApi} messageApi={messageApi}/>, document.getElementById("app"))