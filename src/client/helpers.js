import React, {useEffect, useState} from "react";

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