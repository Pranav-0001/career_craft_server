"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRouter_1 = __importDefault(require("./src/Interfaces/Routes/userRouter"));
const employerRouter_1 = __importDefault(require("./src/Interfaces/Routes/employerRouter"));
const adminRoute_1 = __importDefault(require("./src/Interfaces/Routes/adminRoute"));
const messageRoute_1 = __importDefault(require("./src/Interfaces/Routes/messageRoute"));
const config_1 = require("./src/infra/Database/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors = require('cors');
dotenv_1.default.config();
let port = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({
    origin: ["https://careercraft.vercel.app"],
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use("/", userRouter_1.default);
app.use("/employer", employerRouter_1.default);
app.use("/admin", adminRoute_1.default);
app.use("/msg", messageRoute_1.default);
(0, config_1.db)();
const server = app.listen(port, () => {
    console.log(`Connected to PORT : ${port}`);
});
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: '*'
        // origin:'http://10.4.3.148:3000'
    },
});
io.on("connection", (socket) => {
    socket.on('setup', (userId) => {
        console.log(userId);
        socket.join(userId);
        socket.emit('connected');
    });
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User Joined room : " + room);
    });
    socket.on('new message', (newMessageRecieved) => {
        let chat = newMessageRecieved.chat;
        if (!chat.users)
            return console.log("Chat.users not defiend");
        chat.users.forEach((user) => {
            if (user._id === newMessageRecieved.sender._id)
                return;
            socket.in(user._id).emit('message recieved', newMessageRecieved);
        });
    });
    socket.on('join:video', ({ room, user }) => {
        socket.join(room);
        io.to(room).emit('joined', user);
        console.log(`User ${user} joined video : ${room}`);
    });
    socket.on('offer', ({ offer, roomId }) => {
        io.to(roomId).emit('offer:recieved', offer);
    });
    socket.on('answer', ({ answer, roomId }) => {
        console.log(answer, roomId);
        io.to(roomId).emit('answer:recieved', answer);
    });
    socket.on('ICE', ({ candidate, roomId }) => {
        console.log({ candidate, roomId });
        io.to(roomId).emit('candidate', candidate);
    });
    socket.on('call end', (room) => {
        const status = true;
        io.to(room).emit('disconnect call', status);
    });
});
