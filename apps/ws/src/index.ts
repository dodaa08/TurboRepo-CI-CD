import { WebSocketServer } from "ws";
import {pgClient} from "@repo/prisma/client";
const PORT = 8002;
import "dotenv/config";

const server = new WebSocketServer({
    port : PORT
});

console.log("Connect to ws server on", PORT);

server.on("connection", (socket)=>{
    console.log("Client connected to ws server");
    socket.send("tell me your user password..");

    socket.on("message", async (data)=>{
        const message = data.toString();
        const users = await pgClient.user.create({
            data : {
                email : Math.random().toString() + "@gmail.com",
                password : message
            }
        });
        console.log("user created..");
        socket.send("user created...");
    })

    socket.on('close', () => {
        console.log("Client disconnected");
    });
});

server.on('error', (error) => {
    console.error('WebSocket Server Error:', error);
});