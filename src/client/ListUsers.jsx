import React, {useState} from 'react'

const ListUsers = ({userApi, userData}) => {
    let [users, setUsers] = useState()
    const selfId = userData.id //The id of the currently logged in user.
    if(!users){
        /*If there are no loaded users, load from server*/
        userApi.listUsers().then(
            d => {
                let usersHtml = d.map(u => {
                    let {id, firstname, lastname, email} = u
                    return <li key={id}><p>{firstname} {lastname}, {email}{selfId===id ? ' (deg)' : ''}</p></li>
                })
                setUsers(usersHtml)
            }
        )
    }
    //Return statement, will tell you if you have no friends
    return <div>
        <h4>Eksisterende brukere</h4>
        <ul>{users ?
            users
            : <p>Laster..</p>}</ul>
        {users && users.length === 1 ? <p>Det er visst bare deg her! Trenger to for å chatte! :)</p> : ''}
    </div>
}

export default ListUsers