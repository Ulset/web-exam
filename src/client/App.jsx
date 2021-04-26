import {Link, useHistory} from "react-router-dom";
import {Route, Switch} from "react-router";
import NewUser from "./new_user/new_user";
import React from "react";

export const App = ({userToken}) => {
    if(!userToken){
        const history = useHistory()
        history.push("/login")
    }



    return <div>
        <h1>Cool chat app</h1>
        <Link to={'/'}><p>Hjem</p></Link>
        <p>Logget inn som TODO</p>
        <br/>
        <Switch>
            <Route exact path={'/'}>
                <Link to={'/new_message'}><p>Ny melding</p></Link>
                <Link to={'/my_messages'}><p>Mine meldinger</p></Link>
                <Link to={'/new_user'}><p>Ny bruker</p></Link>
            </Route>
            <Route path={'/new_user'}>
                <NewUser/>
            </Route>
        </Switch>
    </div>
}