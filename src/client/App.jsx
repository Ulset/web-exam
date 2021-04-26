import {Link, useHistory} from "react-router-dom";
import {Route, Switch} from "react-router";
import UserList from "./list_uses/ListUsers";
import React from "react";
import NewMessage from "./new_message/NewMessage";
import MyMessages from "./my_messages/MyMessages";

export const App = ({userToken, userData, userApi, messageApi}) => {
    if (!userToken) {
        //If the user isnt logged in, force to the log in page.
        const history = useHistory()
        history.push("/login")
    }

    if(!userData){
        //If the userdata is still loading, display a message. This prevents components that
        // are dependent on userData to crash on reload.
        return <div>
            <p>Laster brukerdata, vent litt</p>
        </div>
    }

    //Main return statement, this is where the magic starts :P
    return <div>
        <h1>Cool chat app</h1>
        <Link to={'/'}><p>Hjem</p></Link>
        <p>Logget inn som {userData.firstname} {userData.lastname}</p>
        <br/>
        <Switch>
            <Route exact path={'/'}>
                <Link to={'/new_message'}><p>Ny melding</p></Link>
                <Link to={'/my_messages'}><p>Mine meldinger</p></Link>
                <Link to={'/list_users'}><p>Liste over brukere</p></Link>
            </Route>
            <Route path={'/list_users'}>
                <UserList userApi={userApi} userData={userData}/>
            </Route>
            <Route path={'/new_message'}>
                <NewMessage userApi={userApi} messageApi={messageApi} userData={userData}/>
            </Route>
            <Route path={'/my_messages'}>
                <MyMessages />
            </Route>
        </Switch>
    </div>
}