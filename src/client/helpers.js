import React, {useEffect, useState} from "react";

export const google_ident = {
    discoveryURL: "https://accounts.google.com/.well-known/openid-configuration",
    clientId: "53213695995-hv7g2v86afjaepuacln2go95fjul7hko.apps.googleusercontent.com"
}

//Kopiert fra forelesningen til johannes
export async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
    }
    return await res.json();
}

//Kopiert fra forelesning til johannes
export function useLoading(callbackFunc, deps = []) {
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    async function reload() {
        setLoading(true);
        setData(undefined);
        setError(undefined);
        try {
            setData(await callbackFunc());
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(reload, deps);

    return {error, loading, data, reload};
}

//Kopiert fra forelesning til johannes
export function InputField({onChangeValue, value, type = "text", placeholder}) {
    return (
        <div>
            <input
                type={type}
                value={value}
                onChange={(e) => onChangeValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}