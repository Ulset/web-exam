import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

const NewMessage = ({userApi, messageApi, userData}) => {
    const [messageIsCreated, setMessageIsCreated] = useState(false) //For feedback if the message was sent or not
    const [error, setError] = useState(false) //If something goes wrong, let the user know
    const [recipients, setRecipient] = useState([]) //Every user that has ever logged in (since serverstart)
    const [message, setMessage] = useState("") //Message to be composed and sent
    const [selectedRecipient, setSelectedRecipient] = useState(0) //Which recipient is currently selected.
    const {id} = userData
    useEffect(()=>{
        //Only need to get this once, or if the user changes
        userApi.listUsers().then(d => setRecipient(d))
    }, [userData])

    //Loops over the recipients and makes HTML options out of them
    let available_recipients_options = recipients.map(r => {
        return <option value={r.id} key={r.id}>{`${r.firstname} ${r.lastname}`}</option>
    })

    const send_message = async () => {
        //Sends the message to the client
        const resp = await messageApi.send_new_message(id, selectedRecipient, message)
        setMessage("")
        if(resp.status === 201){
            //If server return status code 201 'Created', display a cheerfull message to the user.
            setMessageIsCreated(true)
        }else{
            //If not, display error :(
            setError(true)
        }
    }

    const reset_component = ()=>{
        setMessageIsCreated(false)
        setMessage("")
    }

    if(messageIsCreated){
        //Message is created text
        return <div>
            <p>Privat melding sendt! Jippi!</p>
            <Link to={'/my_messages'}>Mine meldinger</Link>
            <br/><br/>
            <button onClick={reset_component}>Send ny privat melding</button>
        </div>
    }

    if(error){
        //Error text
        return <div>
            <p>Wooooooooooooops! Der skjedde det noe feil når meldingen skulle bli sendt:(</p>
        </div>
    }


    //Main return statement to compose and send a message to a selected recipient.
    return <div>
        <h2>Ny privat melding</h2>
        <p>Meldinger laget her vil bare kunne bli sett av personen du sender det til. Ikke noe mobbing!</p>
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