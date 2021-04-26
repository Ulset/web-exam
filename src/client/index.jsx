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
        return await resp.json()
    }
}

const messageApi = {
    create_new_message: async (senderId, recipientId, message) => {
        const response = await fetch("/api/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({senderId, recipientId, message}),
        });
    }
}

function Index({userApi, messageApi}) {
    const [userToken, setUserToken] = useState();
    const [userData, setUserData] = useState()
    const loadProfile = async () => {
        if (!userData && userToken) {
            userApi.getProfileData(userToken).then(uJson => {
                setUserData(uJson)
            })
        }
    }
    useEffect(() => {
        loadProfile()
    }, [userToken])

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