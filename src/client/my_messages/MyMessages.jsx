import React, {useEffect, useState} from "react";

const MyMessages = ({messagesApi, userData}) => {
    const [ws, setWs] = useState();
    const [messages, setMessages] = useState([]);
    console.log(messages)
    const {id} = userData
    useEffect(async () => {
        //Only need to do the fetching and Websocket connection once.

        //First gets the messages stored in the DB.
        const userMes = await messagesApi.getUserMessages(id)
        setMessages(userMes)
        console.log(userMes)

        //Then connects to the Websocket so new messages are fetched instantly.
        const newWs = new WebSocket("ws://localhost:3000")
        newWs.onclose = (event) => {
            console.log("Close", event)
        }

        newWs.onopen = e => {
            console.log("Open", e.data)
        }

        newWs.onmessage = e => {
            setMessages(messages => [...messages, e.data])
        }
        setWs(newWs)
    }, [])
    return <div>
        <p>Test</p>
    </div>
}

export default MyMessages