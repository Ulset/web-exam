import React from "react";

const MyMessages = ()=>{
    const ws = new WebSocket("ws://localhost:3000")
    ws.onclose = (event) => {
        console.log("Close")
        console.log(event)
    }
    return <div>
        <p>Test</p>
    </div>
}

export default MyMessages