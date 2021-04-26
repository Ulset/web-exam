import React, {useState} from 'react'

const NewMessage = ({userApi, messageApi}) => {
    const [recipients, setRecipient] = useState([])
    const [message, setMessage] = useState("")
    userApi.listUsers().then(d => setRecipient(d))

    let available_recipients_options = recipients.map(r => {
        return <option value={r.id} key={r.id}>{`${r.firstname} ${r.lastname}`}</option>
    })

    const send_message = ()=>{

    }

    return <div>
        <h2>Ny melding</h2>
        <p>Meldinger oprettet her vil starte en ny tråd i 'Mine meldinger' som er live.</p>
        <br/><br/>
        <label>
            Hvem vil du sende til:
            <select>
                {available_recipients_options}
            </select>
        </label>
        <input type={'textarea'} value={message} onChange={(e)=>{setMessage(e.value)}}/>
        <button onClick={send_message}>Send!</button>
    </div>
}

export default NewMessage