import {describe, it} from "@jest/globals";
import React from "react";
import {act} from "react-dom/test-utils";
import {userData, userToken} from "./testHelpers";
import Application from "../src/client/Application";
import ReactDOM from "react-dom";

describe("Test App component", ()=>{
    it("Shows currently logged in user", async ()=>{
        const container = document.createElement("div")
        document.body.appendChild(container)
        await act(async ()=>{
            ReactDOM.render(<Application userToken={userToken} userData={userData}/>, container)
        })
        console.log(container.innerHTML)
    })
})