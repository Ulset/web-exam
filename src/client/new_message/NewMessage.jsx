import React, {useState} from 'react'
import {Link} from "react-router-dom";

const NewMessage = ({userApi, messageApi, userData}) => {
    const [messageIsCreated, setMessageIsCreated] = useState(false) //For at brukeren skal få tilbakemelding om tråden ble laget eller ikke
    const [error, setError] = useState(false) //If something goes wrong, let the user know
    const [recipients, setRecipient] = useState([]) //Alle tilgjenglige mottakere
    const [message, setMessage] = useState("") //Selve meldingen som skal bli sendt
    const [selectedRecipient, setSelectedRecipient] = useState(0) //Hvilken mottaker som er valgt akkurat nå
    const {id} = userData
    userApi.listUsers().then(d => setRecipient(d))

    let available_recipients_options = recipients.map(r => {
        return <option value={r.id} key={r.id}>{`${r.firstname} ${r.lastname}`}</option>
    })

    const send_message = async () => {
        //Sends the message to the client
        const resp = await messageApi.send_new_message(id, selectedRecipient, message)
        if(resp.status === 201){
            setMessageIsCreated(true)
        }else{
            console.log("setter error")
            setError(true)
        }
    }

    const reset_component = ()=>{
        setMessageIsCreated(false)
        setMessage("")
    }

    if(messageIsCreated){
        return <div>
            <p>Tråden ble oprettet!</p>
            <Link to={'/my_messages'}>Mine meldinger</Link>
            <br/><br/>
            <button onClick={reset_component}>Lag enda en tråd</button>
        </div>
    }

    if(error){
        return <div>
            <p>Wooooooooooooops! Der skjedde det noe feil når meldingen skulle bli sendt:(</p>
        </div>
    }

    return <div>
        <h2>Ny melding</h2>
        <p>Meldinger oprettet her vil starte en ny tråd i 'Mine meldinger' som er live.</p>
        <br/>
        <label>
            Hvem vil du sende til:
            <select value={selectedRecipient} onChange={event => {
                setSelectedRecipient(parseInt(event.target.value))
            }}>
                {available_recipients_options}
            </select>
        </label>
        <input type={'textarea'} value={message} onChange={(e) => {
            setMessage(e.target.value)
        }}/>
        <button onClick={send_message}>Send!</button>
    </div>
}

export default NewMessage