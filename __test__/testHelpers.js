const userData = {id: 3, firstname: "Sander", lastname: "Ulset", email: "sander.ulset@gmail.com"}
const userToken = "Bearer testTokentihi"
let users = [
    {"id": 1, "firstname": "Testmann", "lastname": "TestPrivatMeldingson", "email": "jeg@finnes.ikke"},
    {"id": 2, "firstname": "Sander", "lastname": "Ulset", "email": "sander.ulset@verisure.no"}
]
let messages = []

const userApi = {
    listUsers: async () => {return users},
    getProfileData: async (userToken) => {return users[0]}
}

const messageApi = {

}


module.exports = {userData, userToken, userApi, messageApi, users}