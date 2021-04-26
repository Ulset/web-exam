import {Link, useHistory} from "react-router-dom";
import {Route, Switch} from "react-router";
import UserList from "./list_uses/ListUsers";
import React from "react";
import NewMessage from "./new_message/NewMessage";

export const App = ({userToken, userData, userApi, messageApi}) => {
    if (!userToken) {
        //If the user isnt logged in, force to the log in page.
        const history = useHistory()
        history.push("/login")
    }

    if(!userData){
        //Hvis serveren bruker litt tid på å hente brukerdata, så vis en melding. Så ikke React kræsjer.
        return <div>
            <p>Laster brukerdata, vent litt</p>
        </div>
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
            <Route path={'/new_message'}>
                <NewMessage userApi={userApi} messageApi={messageApi} userData={userData}/>
            </Route>
        </Switch>
    </div>
}