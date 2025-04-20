import { useEffect, useState } from "react";
import {io} from "socket.io-client";

export default function UserChat({user, userName}) {
    console.log(user);
    const [resData, setResData] = useState(user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();

    // useEffect(()=>{
    //     async function callRequest(){
    //         const res = await fetch(`http://localhost:3000/chat/${user}`,{
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({MESSAGE: "Good Morning!!"})
    //         });
    //         if (!res.ok) {
    //             throw new Error(`Error: ${res.status}`);
    //         }
    //         const {message, userId} = await res.json();
    //         setResData(message);
    //     }
    //     callRequest();
    //     },[user])
    console.log(messages);
    useEffect(()=>{
        const socket = io("http://localhost:3000");
        socket.emit("joinChat",{message: "message", user, userName});
        socket.on("messageReceived", ({message, user})=>{
            console.log("message received", message);
            setMessages((prevMessages) => [...prevMessages, message]);
        })
        return ()=>{
            socket.disconnect();
        }
    },[user])

    const handleChange = (e) => {
        const messageValue =  e.target.value;
        console.log("message  value is" + messageValue);
        setNewMessage(messageValue);
    }

    const handleSendMessage = () => {   
        const socket = io("http://localhost:3000");
        socket.emit("sendMessage", {message: newMessage, user, userName});
        console.log("new message is"+ newMessage);
    }

    return(
        <div className="flex flex-col w-3/4 m-5 border-amber-200 mx-auto h-[70vh] p-5">
            <div className="bg-black text-white font-bold">Hello, {userName}</div>
            <div className="flex-1 p-5 overflow-scroll border border-b-red-500">
                {/* messages */}
                {
                    (messages.length!=0) && messages.map((message, index)=> {
                        return(
                            <div key={index} className="bg-blue-500 border border-black">
                                {message}
                            </div>
                        )
                    })
                }
            </div>
            <div className="flex flex-row m-8 justify-end border border-green-400">
                <input className="m-4 p-4 outline" placeholder="Enter the Message" onChange={handleChange} value={newMessage}/>
                <button className="bg-blue-700 border-2 rounded-b-md m-4 p-4 hover:cursor-pointer" onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    )
}