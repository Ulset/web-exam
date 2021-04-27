import {describe, it} from "@jest/globals";
import React from "react";
import {act} from "react-dom/test-utils";
import {userApi, userData, userToken} from "./testHelpers";
import Application from "../src/client/Application";
import ReactDOM from "react-dom";


it("Should tell user they need to log in", async ()=>{
    const container = document.createElement("div")
    document.body.appendChild(container)
    await act(async ()=>{
        ReactDOM.render(<Application userToken={userToken} userData={userData}/>, container)
    })
    expect(container.innerHTML).toContain("Du er desverre ikke logget inn")
})

it("Should show frontpage", async ()=>{
    const container = document.createElement("div")
    localStorage.setItem("userToken", "Bearer fakeTokenYolo")
    console.log(localStorage.getItem("userToken"))
    document.body.appendChild(container)
    await act(async ()=>{
        ReactDOM.render(<Application userApi={userApi}/>, container)
    })
})