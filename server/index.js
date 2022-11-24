import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
app.use(cors());

const httpServer = http.Server(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.io = io;

io.on("connection", (socket) => {
  console.log("a user is connected");

  socket.on("message", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/message", (req, res) => {
  console.log("req.app.io", req.app.io.emit);
  req.app.io.emit("emiter", { msg: "hello world" });
});

httpServer.listen(process.env.PORT || 2314, () => {
  console.log("listining...");
});
