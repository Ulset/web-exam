import React, {useEffect, useState} from 'react'
import {InputField} from "../helpers";

const NewUser = ({userApi}) => {
    let [users, setUsers] = useState()
    if(!users){
        userApi.listUsers().then(
            d => {
                let usersHtml = d.map(u => {
                    let {id, firstname, lastname, email} = u
                    return <div key={id}>{firstname} {lastname}, {email}</div>
                })
                setUsers(usersHtml)
            }
        )
    }

    const createNewUser = () =>{
        console.log("lager ny bruker")
        userApi.createNewUser({firstname, lastname, email})
    }

    let [firstname, setNewName] = useState("")
    let [lastname, setNewLastName] = useState("")
    let [email, setNewEmail] = useState("")

    return <div>
        <h4>Eksisterende brukere</h4>
        <div>{users ? users : <p>Laster..</p>}</div>
        <br/>
        <h4>Legg til ny bruker</h4>
        <InputField value={firstname} onChangeValue={setNewName} placeholder={'Fornavn'}/>
        <InputField value={lastname} onChangeValue={setNewLastName} placeholder={'Etternavn'}/>
        <InputField value={email} onChangeValue={setNewEmail} placeholder={'Email'}/>
        <button onClick={createNewUser}>Legg til ny bruker</button>
    </div>
}

export default NewUser