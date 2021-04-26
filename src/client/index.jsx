import React, {useEffect, useState} from 'react'
import ReactDom from 'react-dom'
import {Route, Switch, useHistory} from "react-router";
import {BrowserRouter} from "react-router-dom";
import LoginHandler from "./LoginHandler";
import {App} from "./App";

function Index(){
    const [userToken, setUserToken] = useState();

    return <div>
        <BrowserRouter>
            <Switch>
                <Route path={'/login'}>
                    <LoginHandler setUserToken={setUserToken} />
                </Route>
                <Route>
                    <App userToken={userToken}/>
                </Route>
            </Switch>
        </BrowserRouter>
    </div>
}

ReactDom.render(<Index />, document.getElementById("app"))