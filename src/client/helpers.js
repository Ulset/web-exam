const {useEffect} = require("react");
const {useState} = require("react");

const google_ident = {
    discoveryURL: "https://accounts.google.com/.well-known/openid-configuration",
    clientId: "53213695995-hv7g2v86afjaepuacln2go95fjul7hko.apps.googleusercontent.com"
}

//Kopiert fra forelesningen til johannes
async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}


module.exports = {fetchJson, google_ident}