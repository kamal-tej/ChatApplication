import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function UserChat({ user, userName }) {
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
  useEffect(() => {
    let socket;
    if (location.hostname === "localhost") socket = io("http://localhost:3000");
    else
      socket = io("https://kamalchatapplication.onrender.com", {
        path: "/api/socket.io",
      });
    socket.emit("joinChat", { message: "message", user, userName });
    socket.on("messageReceived", ({ message,userName, user }) => {
      console.log("message received from ", message,user, userName);
      const currentTime = new Date().toLocaleTimeString();
      console.log(messages);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: message, user, userName, timeStamp: currentTime},
      ]);
    });
    return () => {
      socket.disconnect();
    };
  }, [user]);

  const handleChange = (e) => {
    const messageValue = e.target.value;
    console.log("message  value is" + messageValue);
    setNewMessage(messageValue);
  };

  const handleSendMessage = () => {
    let socket;
    if (location.hostname === "localhost") {
      socket = io("http://localhost:3000");
    } else
      socket = io("https://kamalchatapplication.onrender.com", {
        path: "/api/socket.io",
      });
    socket.emit("sendMessage", { message: newMessage, user, userName });
    console.log("new message is" + newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col w-full md:w-3/4 m-5 border-amber-200 mx-auto md:h-[70vh] p-5 h-[100vh]">
      <div className="bg-black text-white font-bold px-2">Hello, {userName}</div>
      <div className="flex-1 p-5 overflow-scroll border">
        {/* messages */}
        {messages.length != 0 &&
          messages.map((message, index) => {
            return (
              <>
                {user !== message.user ? (
                  <div className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {message.userName}
                      <time className="text-xs opacity-50">{message.timeStamp}</time>
                    </div>
                    <div className="chat-bubble">{message.message}</div>
                    <div className="chat-footer opacity-50">Seen</div>
                  </div>
                ) : (
                  <div className="chat chat-end">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {message.userName}
                      <time className="text-xs opacity-50">{message.timeStamp}</time>
                    </div>
                    <div className="chat-bubble">{message.message} </div>
                    <div className="chat-footer opacity-50">Delivered</div>
                  </div>
                )}
              </>
            );
          })}
      </div>
      <div className="flex flex-row justify-center mx-auto p-5">
        <input
          className="m-4 p-4 outline"
          placeholder="Enter the Message"
          onChange={handleChange}
          value={newMessage}
        />
        <button
          className="bg-blue-700 border-2 rounded-md m-4 p-4 hover:cursor-pointer"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
