const google_ident = {
    discoveryURL: "https://accounts.google.com/.well-known/openid-configuration",
    clientId: "53213695995-hv7g2v86afjaepuacln2go95fjul7hko.apps.googleusercontent.com"
}

async function get_google_login_url() {
    const {discoveryURL, clientId} = google_ident;
    const endpoint_resp = await fetch(discoveryURL)
    const {authorization_endpoint} = await endpoint_resp.json()
    const params = {
        client_id: clientId,
        response_type: "token",
        scope: "openid email profile",
        redirect_uri: window.location.origin + "/login",
    };
    return authorization_endpoint + "?" + new URLSearchParams(params);
}


module.exports = {google_ident, get_google_login_url}