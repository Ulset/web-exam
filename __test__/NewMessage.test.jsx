import {it} from "@jest/globals";
import {act} from "react-dom/test-utils";
import React from "react";
import ReactDOM from "react-dom";
import {userApi, userData, users, messageApi} from "./testHelpers";
import NewMessage from "../src/client/NewMessage";
import {Simulate} from "react-dom/cjs/react-dom-test-utils.production.min";

it("Can select users to send to", async ()=>{
    const container = document.createElement("div")
    document.body.appendChild(container)
    await act(async ()=>{
        ReactDOM.render(<NewMessage userData={userData} userApi={userApi} messageApi={messageApi}/>, container)
    })
    const selectDOM = container.querySelector("select")
    for(let userEl of users){
        expect(selectDOM.innerHTML).toContain(userEl.firstname)
        expect(selectDOM.innerHTML).toContain(userEl.lastname)
    }
})

it("Can display error message", async ()=>{
    const container = document.createElement("div")
    let badMessageApi = messageApi
    badMessageApi.send_new_message = async ()=> {
        return {status:404}
    }
    await act(async ()=>{
        ReactDOM.render(<NewMessage userData={userData} userApi={userApi} messageApi={badMessageApi}/>, container)
        Simulate.change(container.querySelector("input"), {target: {value: "Tiss"}})
        Simulate.click(container.querySelector("button"))
    })
    expect(container.querySelector("div > p").innerHTML).toContain("Der skjedde det noe feil")
})