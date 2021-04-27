import {act} from "react-dom/test-utils";
import React from "react";
import ReactDOM from "react-dom";
import {userApi, userData, users} from "./testHelpers";
import ListUsers from "../src/client/ListUsers";
import {it} from "@jest/globals";

it("Lists users", async ()=>{
    const container = document.createElement("div")
    document.body.appendChild(container)
    await act(async ()=>{
        ReactDOM.render(<ListUsers userData={userData} userApi={userApi}/>, container)
    })
    for(let userEl of users){
        expect(container.innerHTML).toContain(userEl.firstname)
        expect(container.innerHTML).toContain(userEl.lastname)
        expect(container.innerHTML).toContain(userEl.email)
    }
})
it("looks the same", async ()=>{
    const container = document.createElement("div")
    document.body.appendChild(container)
    await act(async ()=>{
        ReactDOM.render(<ListUsers userData={userData} userApi={userApi}/>, container)
    })
    expect(container.innerHTML).toMatchSnapshot()
})
