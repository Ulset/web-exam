import {it} from "@jest/globals";
import {act} from "react-dom/test-utils";
import React from "react";
import ReactDOM from "react-dom";
import LoginHandler from "../src/client/LoginHandler";
import {BrowserRouter} from "react-router-dom";

it("Should display button to log in", async ()=>{
    const container = document.createElement("div")
    document.body.appendChild(container)
    await act(async ()=>{
        ReactDOM.render(<LoginHandler />, container)
    })
    expect(container.innerHTML).toContain("Du er desverre ikke logget inn!")
})

it("Should call function with token in URL", async ()=>{
    let testToken = "testTokenBra"

    let function_call_arg = ""
    const set_function_as_run = (token)=>{function_call_arg = token}
    window.history.pushState({}, 'Title', "/login#access_token="+testToken);
    const container = document.createElement("div")
    document.body.appendChild(container)
    await act(async ()=>{
        ReactDOM.render(<BrowserRouter>
            <LoginHandler setUserToken={set_function_as_run}/>
        </BrowserRouter>, container)
    })

    expect(function_call_arg).toMatch(testToken)
})