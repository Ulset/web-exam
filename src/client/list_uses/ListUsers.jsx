import React, {useEffect, useState} from 'react'
import {InputField} from "../helpers";

const ListUsers = ({userApi}) => {
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

    return <div>
        <h4>Eksisterende brukere</h4>
        <div>{users ?
            users
            : <p>Laster..</p>}</div>
        {users && users.length === 1 ? <p>Det er bare en bruker her, venligst logg inn med en ekstra Google konto :)</p> : ''}

    </div>
}

export default ListUsers