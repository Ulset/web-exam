# Eksamen i Webutvikling og API design
Av Sander Ulset

# Endpoints
#### `/api/users` GET -> Returns all users
#### `/api/users/profile/:auth_token` GET -> Returns Username, email etc from Google Oauth
#### `/api/messages` POST -> Adds a new message, broadcasts it on WebSocket
#### `/api/messages/:id` GET -> Returns every message that this user should see (System wide, or private messages)

# Installation
* Run `npm install` to install all dependencies
* run `npm start` in the root folder. 
    * This will run both the Express and the parcel backend. 
* Open up your webbrowser of choice and go to `http://localhost:3000`. 
* Run `npm test` if want to run all tests, and get the coverage.
Done!

# Functionality
- Log in using Google.
- Display all profiles that are reachable trough the chat.
- Public chatting.
- Private messaging.
- In memory DB.

# Test coverage
My tests covers ish 65% of the code. The coverage could have been higher, but i couldn't get test involving WebSockets to work 
correctly.

# Good testruns to see all functionality
You need to have 2 Google accounts handy for testing this application. In my experience, using 2 separate incognito windows
is the best approach.  

#### 1. Testing the 'Display reachable users' functionality.
* Log in with Google account 1, this will take you to URL path `/`
* Click the link named `Liste over brukere`
    * See that you and a test user(used later) is the only one present on the page.
* Log in with Google account 2, navigate to the same page. 
    * See that now there are 3 accounts here, and the currently signed in account has a `(deg)` next to its name.
#### 2. Testing the public chatting system
* Log in with both Google accounts. You are now at path `/`
* Click the link named `Chat` on both accounts.
* Type a message with one account, click send.
* Observe the other accounts chatlog, the message should be there.
#### 3. Testing private messaging
* Log in with both accounts. They are now at path `/`
* On one account click the link to `Ny privat melding`
* On the other account click the link to `Chat`
* On the account currently at the `Ny privat melding` page, select the user called `Testmann TestPrivatMeldingson` from the dropdown menu.
* Type a message.
* Hit send.
* Observe how the account on the `Chat` page, has not received a message.
* On the account on the `Ny privat melding` page, send a new message, now to the other logged in account.
* Observe how the message now is received. And is tagged with `(private)`
#### 4. Testing in memory DB.
* Do test 3.
* Navigate around the page, reload, or close the window entirely.
* Navigate back to the `Chat` and `Liste over brukere` pages.
* Observe how the data is still in memory (as long as the server hasn't reloaded)

# What im proud of // what could've been better
Personally I think the functionality of the application is pretty good. I like that I incorporated both a system wide chat 
, and a private chat that lives in the same container. I think the Google Oauth handling is pretty good aswell. Some parts of the application 
lacks the proper finishing touches, but i didn't have enough time to fix them. 

I also regret not using socket.io from the start. I figured i had to make some 
kind of extra handshake when creating the WebSocket connection between server and client to get the private chat to work. And socket.io 
has this out of the box, i settled on this: 
```javascript
if(data.substr(0, 6) === "USERID"){
    const socket_user_id = parseInt(data.substr(7))
    sockets.push({id: socket_user_id, socket})
    return
}
```
Basically if the first characters of an incoming socket message is `USERID` the server will interpret this as a handshake, 
and use the following numbers as your UserId.

I also wish that i designed the 'database' to work better with WebSockets from the start. The way a POST request to `/api/messages` broadcasts 
the message to WebSocket clients is half assed.