import {Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import UserList from "./ListUsers";
import React from "react";
import NewMessage from "./NewMessage";
import MyMessages from "./MyMessages";

export const App = ({userData, userApi, messageApi}) => {
    if(!userData){
        //If the userdata is still loading, display a message. This prevents components that
        // are dependent on userData to crash on reload.
        return <div>
            <p>Laster brukerdata, vent litt</p>
        </div>
    }

    //Main return statement, this is where the magic starts :P
    return <div className={'main_app'}>
        <h1>Cool chat app</h1>
        <Link to={'/'}><p>Hjem</p></Link>
        <p>Logget inn som {userData.firstname} {userData.lastname}</p>
        <br/><br/>
        <Switch>
            <Route exact path={'/'}>
                <Link to={'/private_message'}><p>Ny privat melding</p></Link>
                <Link to={'/my_messages'}><p>Chat</p></Link>
                <Link to={'/list_users'}><p>Liste over brukere</p></Link>
            </Route>
            <Route path={'/list_users'}>
                <UserList userApi={userApi} userData={userData}/>
            </Route>
            <Route path={'/private_message'}>
                <NewMessage userApi={userApi} messageApi={messageApi} userData={userData}/>
            </Route>
            <Route path={'/my_messages'}>
                <MyMessages messagesApi={messageApi} userData={userData}/>
            </Route>
        </Switch>
    </div>
}