import React, {useEffect} from "react";
import {get_google_login_url} from "./helpers";
import {useHistory} from "react-router";

const LoginHandler = ({setUserToken}) => {
    /*Login handler handles everything log in related. If a hash is used in the request, will set this hash to the current access token
    * index.jsx will send this over to the server for the actual log in process */
    if (window.location.href.includes("#")) {
        //If hash is found in URL, parse this to a userToken
        const hash = Object.fromEntries(new URLSearchParams(window.location.hash.substr(1)));
        const {access_token} = hash
        const access_token_formatted = `Bearer ${access_token}`
        if(hash){
            useEffect(()=>{setUserToken(access_token_formatted)})
            const history = useHistory();
            history.push("/")
        }
        return null;
    }

    return <div>
        <h1>Du er desverre ikke logget inn!</h1>
        <button onClick={async () => {
            window.location.href = await get_google_login_url()
        }}>Logg inn med Google</button>
    </div>
}

export default LoginHandler