import React, {useEffect, useState} from "react";

const MyMessages = ({messagesApi, userData}) => {
    const [ws, setWs] = useState();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const {id, firstname, lastname} = userData
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
            //This is the actual 'connect' part of the backend, kinda janky
            //TODO Socket.io har støtte for ish det samme ut av boksen, bytte hvis jeg har tid.
            newWs.send("USERID "+id)
        }

        newWs.onmessage = e => {
            const dataParsed = JSON.parse(e.data)
            console.log(dataParsed)
            setMessages(messages => [...messages, dataParsed])
        }
        setWs(newWs)
    }, [])

    const send_new_message = ()=>{
        const data = {message:newMessage, id, firstname, lastname}
        ws.send(JSON.stringify(data))
    }

    const message_log = messages.map((el, i) => {
        const {firstname, lastname, message, private_message} = el
        return <p key={i}>{firstname} {lastname} {private_message ? '(privat)' : ''}: {message}</p>
    })
    return <div>
        <div>
            {message_log}
        </div>
        <input type="text" value={newMessage} onChange={event => setNewMessage(event.target.value)}/>
        <button onClick={send_new_message}>Send</button>
    </div>
}

export default MyMessages