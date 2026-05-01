const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

// simple memory storage
let content = "";

io.on("connection", (socket) => {
    console.log("User connected");

    socket.emit("load", content);

    socket.on("edit", (data) => {
        content = data;
        io.emit("update", data);
    });
});

server.listen(4000, () => {
    console.log("Server running on port 4000");
});