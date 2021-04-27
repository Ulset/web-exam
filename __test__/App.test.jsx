import {describe, it} from "@jest/globals";
import {act} from "react-dom/test-utils";
import {App} from "../src/client/App";
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {userData, userToken} from "./testHelpers";

describe("Test App component", ()=>{
    it("Shows currently logged in user", async ()=>{
        const container = document.createElement("div")
        document.body.appendChild(container)
        await act(async ()=>{
            ReactDOM.render(<BrowserRouter>
                <App userToken={userToken} userData={userData}/>
            </BrowserRouter>, container)
        })
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div > p").innerHTML).toEqual(`Logget inn som ${userData.firstname} ${userData.lastname}`)
    })

    it("Shows waiting for userdata screen", async ()=>{
        const container = document.createElement("div")
        document.body.appendChild(container)
        await act(async ()=>{
            ReactDOM.render(<BrowserRouter>
                <App userToken={userToken} userData={null}/>
            </BrowserRouter>, container)
        })
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("p").innerHTML).toEqual("Laster brukerdata, vent litt")
    })
})