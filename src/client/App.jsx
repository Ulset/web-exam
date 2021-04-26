import {Link, useHistory} from "react-router-dom";
import {Route, Switch} from "react-router";
import UserList from "./list_uses/ListUsers";
import React from "react";

export const App = ({userToken, userData, userApi}) => {
    if (!userToken) {
        const history = useHistory()
        history.push("/login")
    }

    return <div>
        <h1>Cool chat app</h1>
        <Link to={'/'}><p>Hjem</p></Link>
        {userData ? <p>Logget inn som {userData.firstname}</p> : ''}
        <br/>
        <Switch>
            <Route exact path={'/'}>
                <Link to={'/new_message'}><p>Ny melding</p></Link>
                <Link to={'/my_messages'}><p>Mine meldinger</p></Link>
                <Link to={'/list_users'}><p>Liste over brukere</p></Link>
            </Route>
            <Route path={'/list_users'}>
                <UserList userApi={userApi}/>
            </Route>
        </Switch>
    </div>
}