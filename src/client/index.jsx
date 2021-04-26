import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom'
import {Route, Switch} from "react-router";
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
        return await resp.json()
    }
}

const messageApi = {
    send_new_message: async (senderId, recipientId, message) => {
        return await fetch("/api/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({senderId, recipientId, message}),
        })
    }
}

function Index({userApi, messageApi}) {
    /*The top level of this react app*/

    const [userToken, setUserToken] = useState();
    const [userData, setUserData] = useState()
    useEffect(() => {
        //If a user token is supplied but no userData is available, ask server who this person is.
        if (!userData && userToken) {
            userApi.getProfileData(userToken).then(uJson => {
                setUserData(uJson)
            })
        }
    }, [userToken])

    //Main return statement. App component will automatically redirect to /login if no userToken is supplied.
    return <div>
        <BrowserRouter>
            <Switch>
                <Route path={'/login'}>
                    <LoginHandler setUserToken={setUserToken}/>
                </Route>
                <Route>
                    <App userToken={userToken} userApi={userApi} messageApi={messageApi} userData={userData}/>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
}

ReactDom.render(<Index userApi={userApi} messageApi={messageApi}/>, document.getElementById("app"))