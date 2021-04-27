# Eksamen i Webutvikling og API design
- Endpoints
- Hva jeg kunne gjort bedre
- Personlig refleksjon

# Installation
* Run `npm install` to install all dependencies
* run `npm start` in the root folder. 
    * This will run both the Express and the parcel backend. 
* Open up your webbrowser of choice and go to `http://localhost:3000`. 
Done!

#Functionality
- Log in using Google.
- Display all profiles that are reachable trough the chat.
- Public chatting.
- Private messaging.
- In memory DB.

#Good testruns to see all functionality
You need to have 2 Google accounts handy for testing this application. In my experience, using 2 separate incognito windows
is the best approach.
####1. Testing the 'Display reachable users' functionality.
* Log in with Google account 1, this will take you to URL path `/`
* Click the link named `Liste over brukere`
    * See that you and a test user(used later) is the only one present on the page.
* Log in with Google account 2, navigate to the same page. 
    * See that now there are 3 accounts here, and the currently signed in account has a `(deg)` next to its name.
####2. Testing the public chatting system
* Log in with both Google accounts. You are now at path `/`
* Click the link named `Chat` on both accounts.
* Type a message with one account, click send.
* Observe the other accounts chatlog, the message should be there.
####3. Testing private messaging
* Log in with both accounts. They are now at path `/`
* On one account click the link to `Ny privat melding`
* On the other account click the link to `Chat`
* On the account currently at the `Ny privat melding` page, select the user called `Testmann TestPrivatMeldingson` from the dropdown menu.
* Type a message.
* Hit send.
* Observe how the account on the `Chat` page, has not received a message.
* On the account on the `Ny privat melding` page, send a new message, now to the other logged in account.
* Observe how the message now is received. And is tagged with `(private)`
####4. Testing in memory DB.
* Do test 3.
* Navigate around the page, reload, or close the window entirely.
* Navigate back to the `Chat` and `Liste over brukere` pages(you may need to log in again.)
* Observe how the data is still in memory (as long as the server hasn't reloaded)