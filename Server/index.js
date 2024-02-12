const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const userRouter = require("./Routes/user");
const chatRouter = require("./Routes/chat");
const messageRouter = require("./Routes/message");

app.use(express.json());
app.use(userRouter);
app.use(chatRouter);
app.use(messageRouter);

const server = app.listen(
  process.env.PORT,
  console.log("Server is running on http://localhost:5000/")
);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    socket.join();
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("new message", (message) => {});
});
