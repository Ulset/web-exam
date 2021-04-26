import React, {useEffect} from "react";
import {fetchJson} from "./helpers";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";

const google_ident = {
    discoveryURL: "https://accounts.google.com/.well-known/openid-configuration",
    clientId: "53213695995-hv7g2v86afjaepuacln2go95fjul7hko.apps.googleusercontent.com"
}

async function redirect_to_google_login() {
    const {discoveryURL, clientId} = google_ident;
    const {authorization_endpoint} = await fetchJson(discoveryURL)
    const params = {
        client_id: clientId,
        response_type: "token",
        scope: "openid email profile",
        redirect_uri: window.location.origin+"/login",
    };
    window.location.href = authorization_endpoint + "?" + new URLSearchParams(params);
}

const LoginHandler = ({setUserToken}) => {
    if (window.location.href.includes("#")) {
        //If user has already logged inn, parse the supplied userdata
        const hash = Object.fromEntries(new URLSearchParams(window.location.hash.substr(1)));
        const {access_token} = hash
        const access_token_formatted = `Bearer ${access_token}`
        if(hash){
            useEffect(()=>{setUserToken(access_token_formatted)})
            console.log("done")
            const history = useHistory();
            history.push("/")
        }
        return null;
    }

    return <div>
        <h1>Du er desverre ikke logget inn!</h1>
        <button onClick={redirect_to_google_login}>Logg inn med Google</button>
    </div>
}

export default LoginHandler