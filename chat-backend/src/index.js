const http = require('http');
const socket = require('socket.io');
const express = require("express");
const app = express();
app.use(express.json());
const route = express.Router();
const cors = require("cors");
const {roomId} = require("./constants");


const server = http.createServer(app);
const io = socket(server, {
    cors:{
        origin: "https://chatapplication-m8d6.onrender.com",
        //origin: "http://localhost:5173",
    },
    path: "/api/socket.io"
});

io.on("connection", (socket)=>{
    socket.on("joinChat",({message, user, userName})=>{
        console.log(userName, "joining room", roomId);
        socket.join(roomId);
    });

    socket.on("sendMessage",({message,user, userName})=>{
        console.log(message,user, userName);
        console.log(userName," is sending ",message);
        io.to(roomId).emit("messageReceived", {message,userName,user})
    });

    socket.on("disconnect",()=>{});
})

app.use(cors({
    origin: "https://chatapplication-m8d6.onrender.com",
    //origin: "http://localhost:5173",
    credentials: true,
}));
app.use(route);

// route.get('/chat',(req,res)=>{
//     res.send("hello");
// });

// route.post('/chat/:user',(req,res)=>{
//     const userId = req.params.user;
//     const {MESSAGE} = req.body;
//     console.log(userId);
//     console.log(MESSAGE);
//     res.send({message: MESSAGE, userId: userId});
// })

route.get('/',(req, res)=>{
    res.send("hello");
})

server.listen(3000,()=> console.log("server is started at port 3000"));
